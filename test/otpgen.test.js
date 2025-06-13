const chai = require('chai');
const expect = require('chai').expect;
const chaiString = require('chai-string');
chai.use(chaiString);

const { 
  otpGen, 
  customOtpGen, 
  bulkOtpGen, 
  setWebhookHandler,
  WEBHOOK_EVENTS 
} = require('../index');

describe('Otp Generator Test Suite', () => {
  it('should generate otp of default length 6', async () => {
    const id = await otpGen();

    expect(id).to.be.a('string');
    expect(id).to.have.lengthOf(6);
  });

  it('should generate otp of length 4', async () => {
    const id = await customOtpGen({length: 4});

    expect(id).to.be.a('string');
    expect(id).to.have.lengthOf(4);
  });

  it('should generate otp of length 6 with custom characters', async () => {
    const chars = '1234abcd'
    const id = await customOtpGen({chars});

    expect(id).to.be.a('string');
    expect(id).to.have.lengthOf(6);
    const regEx = /[1,2,3,4,a,b,c,d]{6}/;
    const found = id.match(regEx);
    expect(found).to.be.an('array');
  });

  it('should generate otp in bulk', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length);

    expect(ids).to.be.an('array');
    expect(ids).to.have.lengthOf(length);
  });

  it('should generate otp in bulk with custom char', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length, {chars: '1234@abcd'});

    expect(ids).to.be.an('array');
    expect(ids).to.have.lengthOf(length);
  });

  it('should generate otp in bulk with custom length', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length, {length: 5});

    expect(ids).to.be.an('array');
    expect(ids).to.have.lengthOf(length);
  });

  it('should generate otp in bulk with custom chars and length', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length, {chars: 'abcd123', length: 5});

    expect(ids).to.be.an('array');
    expect(ids).to.have.lengthOf(length);
  });

  it('should throw error if length is < 0', async () => {
    try {
      const id = await customOtpGen({length: -1});
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
    }
  });

  it('should throw error if length is not a number', async () => {
    try {
      const id = await customOtpGen({length: 'abc'});
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
    }
  });

  it('should throw error if bulk number is <= 0', async () => {
    try {
      const id = await bulkOtpGen(0);
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
    }
  });

  it('should throw error if bulk number is not a number', async () => {
    try {
      const id = await bulkOtpGen('0');
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
    }
  });

  describe('Webhook Tests', () => {
    let webhookEvents = [];
    let webhookData = [];

    beforeEach(() => {
      webhookEvents = [];
      webhookData = [];

      setWebhookHandler((event, data) => {
        webhookEvents.push(event);
        webhookData.push(data);
      });
    });

    it('should trigger webhook for single OTP generation', async () => {
      await otpGen();
      expect(webhookEvents).to.include(WEBHOOK_EVENTS.OTP_GENERATED);
      expect(webhookData[0]).to.have.property('otp');
    });

    it('should trigger webhook for bulk OTP generation', async () => {
      const length = 3;
      await bulkOtpGen(length);
      expect(webhookEvents).to.include(WEBHOOK_EVENTS.OTP_BULK_GENERATED);
      expect(webhookData[0]).to.have.property('count', length);
      expect(webhookData[0]).to.have.property('otps').that.is.an('array');
      expect(webhookData[0].otps).to.have.lengthOf(length);
    });

    it('should handle webhook handler errors gracefully', async () => {
      setWebhookHandler(() => {
        throw new Error('Webhook error');
      });
      const id = await otpGen();
      expect(id).to.be.a('string');
      expect(id).to.have.lengthOf(6);
    });

    it('should throw error for invalid webhook handler', () => {
      expect(() => setWebhookHandler('not-a-function')).to.throw(Error);
    });
  });
});
