module.exports = Object.freeze({
  ITEM_ALPHABET : '0123456789',
  OTP_LENGTH    : 6,
  BATCH_SIZE    : 20,
  // Webhook events
  WEBHOOK_EVENTS: {
    OTP_GENERATED: 'otp-generated',
    OTP_BULK_GENERATED: 'bulk-otp-generated'
  }
})