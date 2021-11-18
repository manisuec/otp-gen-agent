# otp-gen-agent
A nanoid based otp generator

## Install
`npm install otp-gen-agent --save`

## Usage

Mobile number has become the defacto user authentication mechanism in India and hence, OTP generation is a very common phenomena.
This is a small utility lib to generate OTP. 
### default
```
const { otpGen } = require('otp-gen-agent');

const otp = await otpGen(); // '344156'  (OTP length is 6 digit by default)

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

You can customise the OTP length and also the characters to be used for OTP generation.
  - Default OTP lenght is 6.
  - Default characters used to generate OTP is 0123456789
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