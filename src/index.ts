import { customAlphabet } from 'nanoid';
import {
  ITEM_ALPHABET,
  OTP_LENGTH,
  WEBHOOK_EVENTS,
} from './constants.js';

export type WebhookEvent = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];

export interface OtpOptions {
  length?: number;
  chars?: string;
}

export interface BulkOtpOptions extends OtpOptions {}

export type WebhookHandler = (event: WebhookEvent, data: Record<string, unknown>) => void | Promise<void>;

const nid = customAlphabet(ITEM_ALPHABET, OTP_LENGTH);

let webhookHandler: WebhookHandler | null = null;

export const setWebhookHandler = (handler: WebhookHandler): void => {
  if (typeof handler !== 'function') {
    throw new Error('Webhook handler must be a function');
  }

  webhookHandler = handler;
};

const triggerWebhook = async (event: WebhookEvent, data: Record<string, unknown>): Promise<void> => {
  if (webhookHandler) {
    try {
      await webhookHandler(event, data);
    } catch (error) {
      throw new Error('Error in running Webhook handler');
    }
  }
};

export const otpGen = async (): Promise<string> => {
  const otp = nid();

  await triggerWebhook(WEBHOOK_EVENTS.OTP_GENERATED, { otp });
  return otp;
};

export const customOtpGen = async ({
  length = OTP_LENGTH,
  chars = ITEM_ALPHABET,
}: OtpOptions = {}): Promise<string> => {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('otp length must be greater than 0');
  }

  const idGen = customAlphabet(chars, length);
  const otp = idGen();

  await triggerWebhook(WEBHOOK_EVENTS.OTP_GENERATED, { otp });
  return otp;
};

const YIELD_EVERY = 1000;

const yieldToEventLoop = () => new Promise<void>(resolve => setTimeout(resolve, 0));

export const bulkOtpGen = async (count: number = 0, opts: BulkOtpOptions = {}): Promise<string[]> => {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error('count must be greater than 0');
  }

  const { length = OTP_LENGTH, chars = ITEM_ALPHABET } = opts;

  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('otp length must be greater than 0');
  }

  const idGen = customAlphabet(chars, length);
  const idArr: string[] = new Array(count);

  for (let i = 0; i < count; i++) {
    idArr[i] = idGen();

    if ((i + 1) % YIELD_EVERY === 0) {
      await yieldToEventLoop();
    }
  }

  await triggerWebhook(WEBHOOK_EVENTS.OTP_BULK_GENERATED, { count, otps: idArr });
  return idArr;
};

export { WEBHOOK_EVENTS };
