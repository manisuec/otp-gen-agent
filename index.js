const nanoid = require('nanoid/async');

const { 
  ITEM_ALPHABET, 
  OTP_LENGTH, 
  BATCH_SIZE,
  WEBHOOK_EVENTS 
} = require('./constants');

const { customAlphabet } = nanoid;
const nid = customAlphabet(ITEM_ALPHABET, OTP_LENGTH);

// Webhook handler
let webhookHandler = null;

const setWebhookHandler = (handler) => {
  if (typeof handler !== 'function') {
    throw new Error('Webhook handler must be a function');
  }
  webhookHandler = handler;
};

const triggerWebhook = async (event, data) => {
  if (webhookHandler) {
    try {
      await webhookHandler(event, data);
    } catch (error) {
      console.error('Webhook handler error:', error);
    }
  }
};

const otpGen = async (opts = {}) => {
  const otp = await nid();
  
  await triggerWebhook(WEBHOOK_EVENTS.OTP_GENERATED, { otp });
  return otp;
};

const customOtpGen = async ({ length = OTP_LENGTH, chars = ITEM_ALPHABET }) => {
  if (!Number.isInteger(length) || !length > 0) {
    throw new Error('otp length must be greater than 0');
  }

  const idGen = customAlphabet(chars, length);
  const otp = await idGen();

  await triggerWebhook(WEBHOOK_EVENTS.OTP_GENERATED, { otp });
  return otp;
};

const bulkOtpGen = async (num = 0, opts = {}) => {
  if (!Number.isInteger(num) || !num > 0) {
    throw new Error('num must be greater than 0');
  }

  const {
    length = OTP_LENGTH, 
    chars = ITEM_ALPHABET
  } = opts;

  if (!Number.isInteger(length) || !length > 0) {
    throw new Error('otp length must be greater than 0');
  }

  const idGen = customAlphabet(chars, length);
  let promiseArr = [];
  const idArr = [];

  for (let i = 1; i <= num; ++i) {
    promiseArr.push(idGen());

    if (i % BATCH_SIZE === 0) {
      let ids = await Promise.all(promiseArr);

      idArr.push(...ids);      
      promiseArr = [];
    }
  }

  if (promiseArr.length !== 0) {
    let ids = await Promise.all(promiseArr);
    
    idArr.push(...ids);   
  }

  await triggerWebhook(WEBHOOK_EVENTS.OTP_BULK_GENERATED, { count: num, otps: idArr });
  return idArr;
};

module.exports = {
  otpGen,
  customOtpGen,
  bulkOtpGen,
  setWebhookHandler,
  WEBHOOK_EVENTS
};