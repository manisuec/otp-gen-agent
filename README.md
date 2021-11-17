# otp-gen-agent
A nanoid based otp generator

[![https://nodei.co/npm/otp-gen-agent.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/otp-gen-agent.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/otp-gen-agent)


[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)




## Install
`npm install otp-gen-agent --save`

## Usage
 
### default
```
const { otpGen } = require('otp-gen-agent');

const otp = await otpGen(); // '344156'

```

### custom otp generator

```
const { customOtpGen } = require('otp-gen-agent');

const otp = await customOtpGen({length: 4, chars: 'abc123}); // 'a3c1'

```

Arguments: 
  - options: optional
    - length: custom length
    - chars: custom characters

### bulk otp generator

```
const { bulkOtpGen } = require('otp-gen-agent');

const otp = await bulkOtpGen(2); // Array of otps: ['344156', '512398']

```

Arguments: 
  - num: num of otps to be generated

Useful in cases where number of OTPs to be generated is known before hand
## Test

`npm run test`

## License
[MIT][license-url]



[license-url]: LICENSE
