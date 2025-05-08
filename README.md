<!--
  Title: OTP Generator Agent
  Description: A small utility library for generating OTP using nanoid
  Author: manisuec
  -->

# otp-gen-agent: Secure One-Time Password Generation for Node.js
A small and secure one time password (otp) generator for Javascript based on [nanoid](https://github.com/ai/nanoid#readme).

[![NPM][npm-img]][npm-url]

[![contributions welcome][contribution-img]][contribution-url]
[![npm version][npm-version-img]][npm-version-url]
![License](https://img.shields.io/npm/l/otp-gen-agent)

> <a href="https://www.buymeacoffee.com/manisuec" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" height="52" width="200"></a> <br/>
> If you find this utility library useful, you can [buy me a coffee](https://www.buymeacoffee.com/manisuec) to keep me energized for creating libraries like this.


## What is OTP-Gen-Agent?

`otp-gen-agent` is a lightweight, flexible Node.js library designed to simplify one-time password (OTP) generation for authentication systems. With mobile number verification becoming the standard authentication method across India and many other regions, this utility provides developers with reliable OTP generation capabilities.

## Installation
`npm install otp-gen-agent --save`

## Core Features

- **Simple API**: Generate secure OTPs with minimal code
- **Customizable**: Control OTP length and character set
- **Bulk Generation**: Create multiple OTPs in a single operation
- **Lightweight**: No bloated dependencies
- **Promise-based**: Modern async/await support

## Usage

Mobile number has become the defacto user authentication mechanism in India and hence, OTP generation is a very common phenomena.
This is a small utility lib to generate OTP.

### Standard OTP Generation

Generate a standard 6-digit numeric OTP:

```js
const { otpGen } = require('otp-gen-agent');

const otp = await otpGen(); // '344156'  (OTP length is 6 digit by default)

```
  - Default OTP lenght: 6
  - Default characters set: 0123456789 (Numeric [0-9])

### Custom OTP Generation

Create OTPs with custom length and character sets:

```js
const { customOtpGen } = require('otp-gen-agent');

const otp = await customOtpGen({length: 4, chars: 'abc123'}); // 'a3c1'

```

**Arguments:** 
  - options: optional
    - length: custom otp length
    - chars: custom characters

You can customise the OTP length and also the characters to be used for OTP generation.
  - Default OTP lenght is 6.
  - Default characters used to generate OTP is 0123456789

### Bulk OTP Generation

Generate multiple OTPs in a single operation:

```js
const { bulkOtpGen } = require('otp-gen-agent');

const otp = await bulkOtpGen(2); // Array of otps: ['344156', '512398']

```

```js
const { bulkOtpGen } = require('otp-gen-agent');

const otp = await bulkOtpGen(2, {length = 5, chars: 'abcd123'} ); // Array of otps: ['312b3', 'bcddd']

```

**Arguments:** 
  - num: number of OTPs to be generated in bulk
  - opts: optional argument
    - length: custom otp length (default: 6)
    - chars: custom characters (default: 0123456789)

### When to Use Bulk Generation

The bulk generation feature is particularly useful when:

- Pre-generating OTPs for upcoming authentication requests
- Testing authentication systems with multiple users
- Creating backup validation codes

## Test

`npm run test`

## Read More

Read more in detail at [A One Time Password (OTP) generator](https://techinsights.manisuec.com/nodejs/otp-generator-nodejs/)

## License
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
Read my blog at [Tech Insights: Personal Tech Blog](https://techinsights.manisuec.com)
