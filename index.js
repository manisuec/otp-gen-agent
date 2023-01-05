const nanoid = require('nanoid/async');

const { ITEM_ALPHABET, OTP_LENGTH, BATCH_SIZE } = require('./constants');

const { customAlphabet } = nanoid;
const nid = customAlphabet(ITEM_ALPHABET, OTP_LENGTH);

const otpGen = async () => await nid();

const customOtpGen = async ( { length = OTP_LENGTH, chars =  ITEM_ALPHABET }) => {
  if (!Number.isInteger(length) || !length > 0) {
    throw new Error('otp length must be greater than 0');
  }

  const idGen = customAlphabet(chars, length);

  return idGen();
}

const bulkOtpGen = async (num = 0, opts = {}) => {
  if (!Number.isInteger(num) || !num > 0) {
    throw new Error('num must be greater than 0');
  }

  const { length = OTP_LENGTH, chars =  ITEM_ALPHABET } = opts;

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

  return idArr;
};


module.exports = {
  otpGen,
  customOtpGen,
  bulkOtpGen
};