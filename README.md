<!--
  Title: OTP Generator Agent
  Description: A small utility library for generating OTP using nanoid
  Author: manisuec
  -->

# otp-gen-agent: Secure One-Time Password Generation for Node.js
A small and secure one time password (otp) generator for Node.js with TypeScript support, based on [nanoid](https://github.com/ai/nanoid#readme).

[![NPM][npm-img]][npm-url]

[![contributions welcome][contribution-img]][contribution-url]
[![npm version][npm-version-img]][npm-version-url]
![License](https://img.shields.io/npm/l/otp-gen-agent)

> <a href="https://www.buymeacoffee.com/manisuec" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" height="52" width="200"></a> <br/>
> If you find this utility library useful, you can [buy me a coffee](https://www.buymeacoffee.com/manisuec) to keep me energized for creating libraries like this.


## What is OTP-Gen-Agent?

`otp-gen-agent` is a lightweight, flexible Node.js library designed to simplify one-time password (OTP) generation for authentication systems. With mobile number verification becoming the standard authentication mechanism across India and many other regions, this utility provides developers with reliable OTP generation capabilities.

## Installation
```
npm install otp-gen-agent --save
```

## Core Features

- **TypeScript Support**: Full type declarations included
- **ESM & CommonJS**: Works with both `import` and `require()`
- **Simple API**: Generate secure OTPs with minimal code
- **Customizable**: Control OTP length and character set
- **Bulk Generation**: Create multiple OTPs in a single operation
- **Lightweight**: Minimal dependencies
- **Promise-based**: Modern async/await support
- **Webhook Support**: Trigger webhooks for OTP generation events

## Usage

### ESM (import)

```js
import { otpGen, customOtpGen, bulkOtpGen } from 'otp-gen-agent';
```

### CommonJS (require)

```js
const { otpGen, customOtpGen, bulkOtpGen } = require('otp-gen-agent');
```

### Standard OTP Generation

Generate a standard 6-digit numeric OTP:

```js
const otp = await otpGen(); // '344156'  (OTP length is 6 digit by default)
```
  - Default OTP length: 6
  - Default character set: `0123456789` (Numeric [0-9])

### Custom OTP Generation

Create OTPs with custom length and character sets:

```js
const otp = await customOtpGen({ length: 4, chars: 'abc123' }); // 'a3c1'
```

**Arguments:**
  - options: optional
    - `length`: custom otp length
    - `chars`: custom characters

You can customise the OTP length and also the characters to be used for OTP generation.
  - Default OTP length is 6.
  - Default characters used to generate OTP is `0123456789`

### Bulk OTP Generation

Generate multiple OTPs in a single operation:

```js
const otps = await bulkOtpGen(2); // Array of otps: ['344156', '512398']
```

```js
const otps = await bulkOtpGen(2, { length: 5, chars: 'abcd123' }); // Array of otps: ['312b3', 'bcddd']
```

**Arguments:**
  - `count`: count of OTPs to be generated in bulk
  - `opts`: optional argument
    - `length`: custom otp length (default: 6)
    - `chars`: custom characters (default: `0123456789`)

### When to Use Bulk Generation

The bulk generation feature is particularly useful when:

- Pre-generating OTPs for upcoming authentication requests
- Testing authentication systems with multiple users
- Creating backup validation codes

### Webhook Support

The library provides webhook support to track OTP generation events. You can set up a webhook handler to receive notifications when OTPs are generated:

```js
import { otpGen, bulkOtpGen, setWebhookHandler, WEBHOOK_EVENTS } from 'otp-gen-agent';

// custom webhook handler function
const webHookHandler = async (event, data) => {
  switch (event) {
    case WEBHOOK_EVENTS.OTP_GENERATED:
      console.log('Single OTP generated:', data.otp);
      break;
    case WEBHOOK_EVENTS.OTP_BULK_GENERATED:
      console.log(`Generated ${data.count} OTPs:`, data.otps);
      break;
  }
};

// Set up webhook handler
setWebhookHandler(webHookHandler);

// Generate OTPs - webhook will be triggered automatically
const otp = await otpGen(); // Triggers OTP_GENERATED event
const bulkOtps = await bulkOtpGen(3); // Triggers OTP_BULK_GENERATED event
```

**Webhook Events:**
- `otp-generated`: Triggered when a single OTP is generated
  - Payload: `{ otp: string }`
- `bulk-otp-generated`: Triggered when multiple OTPs are generated
  - Payload: `{ count: number, otps: string[] }`

**Features:**
- Automatic webhook triggering for all OTP generation methods
- Error handling for webhook failures
- Type-safe event handling
- Customizable webhook handler implementation

## TypeScript

Type declarations are included out of the box. Key types:

```ts
interface OtpOptions {
  length?: number;
  chars?: string;
}

interface BulkOtpOptions extends OtpOptions {}

type WebhookEvent = 'otp-generated' | 'bulk-otp-generated';

type WebhookHandler = (event: WebhookEvent, data: Record<string, unknown>) => void | Promise<void>;
```

## API Reference

| Function | Description |
|----------|-------------|
| `otpGen()` | Generate a 6-digit numeric OTP |
| `customOtpGen(options?)` | Generate OTP with custom length/chars |
| `bulkOtpGen(count, options?)` | Generate multiple OTPs |
| `setWebhookHandler(handler)` | Register a webhook handler |

## Development

```bash
# Install dependencies
npm install

# Typecheck
npm run typecheck

# Build (outputs dist/index.js + dist/index.cjs)
npm run build

# Run tests
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details

[MIT][license-url]


[license-url]: LICENSE
[npm-img]: https://nodei.co/npm/otp-gen-agent.png?downloads=true&downloadRank=true&stars=true
[npm-url]: https://www.npmjs.com/package/otp-gen-agent
[npm-version-img]: https://badge.fury.io/js/otp-gen-agent.svg
[npm-version-url]: http://badge.fury.io/js/otp-gen-agent
[contribution-img]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat
[contribution-url]: https://github.com/dwyl/esta/issues

<a href="https://www.buymeacoffee.com/manisuec" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" height="41" width="174"></a>

> If you find this utility library useful, you can [buy me a coffee](https://www.buymeacoffee.com/manisuec) to keep me energized for creating libraries like this.

## Tech Blog
Read my personal blog on various tech topics at [Tech Insights: Personal Tech Blog](https://techinsights.manisuec.com)
