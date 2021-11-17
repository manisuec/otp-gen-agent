const expect = require('chai').expect;

const { otpGen, customOtpGen, bulkOtpGen } = require('../index');

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

  it('should throw error if length is < 0', async () => {
    try {
      const id = await customOtpGen({length: -1});
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
});
