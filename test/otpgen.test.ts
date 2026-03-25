import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  otpGen,
  customOtpGen,
  bulkOtpGen,
  setWebhookHandler,
  WEBHOOK_EVENTS,
} from '../src/index';

describe('Otp Generator Test Suite', () => {
  it('should generate otp of default length 6', async () => {
    const id = await otpGen();
    assert.strictEqual(typeof id, 'string');
    assert.strictEqual(id.length, 6);
  });

  it('should generate otp of length 4', async () => {
    const id = await customOtpGen({ length: 4 });
    assert.strictEqual(typeof id, 'string');
    assert.strictEqual(id.length, 4);
  });

  it('should generate otp of length 6 with custom characters', async () => {
    const chars = '1234abcd';
    const id = await customOtpGen({ chars });
    assert.strictEqual(typeof id, 'string');
    assert.strictEqual(id.length, 6);
    const regEx = /[1234abcd]{6}/;
    assert.ok(regEx.test(id));
  });

  it('should generate otp in bulk', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length);
    assert.ok(Array.isArray(ids));
    assert.strictEqual(ids.length, length);
  });

  it('should generate otp in bulk with custom char', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length, { chars: '1234@abcd' });
    assert.ok(Array.isArray(ids));
    assert.strictEqual(ids.length, length);
  });

  it('should generate otp in bulk with custom length', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length, { length: 5 });
    assert.ok(Array.isArray(ids));
    assert.strictEqual(ids.length, length);
  });

  it('should generate otp in bulk with custom chars and length', async () => {
    const length = 25;
    const ids = await bulkOtpGen(length, { chars: 'abcd123', length: 5 });
    assert.ok(Array.isArray(ids));
    assert.strictEqual(ids.length, length);
  });

  it('should throw error if length is < 0', async () => {
    await assert.rejects(() => customOtpGen({ length: -1 }), Error);
  });

  it('should throw error if length is not a number', async () => {
    await assert.rejects(
      () => customOtpGen({ length: 'abc' as unknown as number }),
      Error
    );
  });

  it('should throw error if bulk number is <= 0', async () => {
    await assert.rejects(() => bulkOtpGen(0), Error);
  });

  it('should throw error if bulk number is not a number', async () => {
    await assert.rejects(
      () => bulkOtpGen('0' as unknown as number),
      Error
    );
  });

  describe('Webhook Tests', () => {
    let webhookEvents: string[] = [];
    let webhookData: Record<string, unknown>[] = [];

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
      assert.ok(webhookEvents.includes(WEBHOOK_EVENTS.OTP_GENERATED));
      assert.ok('otp' in webhookData[0]);
    });

    it('should trigger webhook for bulk OTP generation', async () => {
      const length = 3;
      await bulkOtpGen(length);
      assert.ok(webhookEvents.includes(WEBHOOK_EVENTS.OTP_BULK_GENERATED));
      assert.strictEqual(webhookData[0].count, length);
      assert.ok(Array.isArray(webhookData[0].otps));
      assert.strictEqual((webhookData[0].otps as string[]).length, length);
    });

    it('should handle webhook handler errors gracefully', async () => {
      setWebhookHandler(() => {
        throw new Error('Webhook error');
      });
      
      try {
      const id = await otpGen();
      } catch (error) {         
        assert.strictEqual((error as Error).message, 'Error in running Webhook handler');
      } 
    });

    it('should throw error for invalid webhook handler', () => {
      assert.throws(
        () => setWebhookHandler('not-a-function' as unknown as (event: string, data: Record<string, unknown>) => void),
        Error
      );
    });
  });
});
