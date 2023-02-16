<!--
  Title: OTP Generator Agent
  Description: A small utility library for generating OTP using nanoid
  Author: manisuec
  -->

# otp-gen-agent
A small and secure one time password (otp) generator for Javascript based on [nanoid](https://github.com/ai/nanoid#readme).

[![NPM][npm-img]][npm-url]


[![contributions welcome][contribution-img]][contribution-url]
[![npm version][npm-version-img]][npm-version-url]
![License](https://img.shields.io/npm/l/otp-gen-agent)


## Installation
`npm install otp-gen-agent --save`

## Usage

Mobile number has become the defacto user authentication mechanism in India and hence, OTP generation is a very common phenomena.
This is a small utility lib to generate OTP. 
### default
```js
const { otpGen } = require('otp-gen-agent');

const otp = await otpGen(); // '344156'  (OTP length is 6 digit by default)

```
  - Default OTP lenght is 6
  - Default characters used to generate OTP is 0123456789

### custom otp generator

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
### bulk otp generator

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

Useful in cases where number of OTPs to be generated is known before hand.
## Test

`npm run test`

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
