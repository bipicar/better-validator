# better-validator

_better-validator_ is my second generation object or request validator for node.js.

The aim of this validator is to

* be simple to use
* support a number of usage patterns including a *fluent interface*
* support re-use of validator parts
* support deep object and array validation
* be able to customise the output structure
* be able to customise failure messages
* support i18n
* use the well known [validator](https://www.npmjs.com/package/validator) library for string validation
* be easily used with both express.js and koa.js

## Basic usage
```javascript
const Validator = require('better-validator');
```

```javascript
const validator = new Validator();

validator(123).isNumber();
const errors = validator.run(); // => []
```

```javascript
const validator = new Validator();

validator('not number').isNumber();
const errors = validator.run(); // => [{path: [], value: 'not number', test: 'isNumber'}]
```

Validate multiple objects at once:

```javascript
const validator = new Validator();

const query = {};
const body = null;

validator(query).display('query').required();
validator(body).display('body').required();
const errors = validator.run(); // => [{path: ['body'], value: null, test: 'required'}]
```

Validate children of an object:

```javascript
const validator = new Validator();

const query = {count: 5, hint: 32};

validator(query).required().isObject((obj) => {
  obj('count').required().isNumber().integer(); // pass
  obj('hint').isString(); // fail
});
const errors = validator.run(); // => [{path: ['hint'], value: 32, test: 'isString'}]
```

Validate children of an array:

```javascript
const validator = new Validator();

const array = [{count: 5, hint: 32}];

validator(array).required().isArrayOf((child) => {
  child('count').required().isNumber().integer(); // pass
  child('hint').isString(); // fail
});
const errors = validator.run(); // => [{path: [0, 'hint'], value: 32, test: 'isString'}]
```

Re-usable validation parts:

```javascript
const validator = new Validator();

const rule = (item) => {
  item.isNumber().integer().isPositive();
};

const errors = validator(123, rule); // => []
```

```javascript
const validator = new Validator();

const query = {count: 5, hint: '32'};

const rule = (item) => item.isNumber().integer().isPositive();

validator(query).required().isObject((child) => {
  child('count').check(rule).lte(10); // pass
  child('hint').check(rule); // fail
});
const errors = validator.run(); // => [{path: ['hint'], value: '32', test: 'isNumber'}]
```

Using with express.js

```javascript
const Formatter = require('better-validator/format/response/wrapperFormatter');
const check = Validator.expressMiddleware({responseFormatter: new Formatter()});
const queryRule = (query) => {
  query('email').isEmail();
  query('date').isISO8601();
};
const bodyRule = (body) => {
  body('count').required().isNumber().integer();
  body('hint').isString();
  body().strict(); // make sure there aren't any expected properties in the body
};
app.post('/', [check.query(queryRule), check.body(bodyRule), function(req, res) {
  // ...
}
```


TODO

Using with koa.js

```javascript
const Formatter = require('better-validator/format/response/wrapperFormatter');
const check = Validator.koaMiddleware({responseFormatter: new Formatter()});
const queryRule = (query) => {
  query('email').isEmail();
  query('date').isISO8601();
};
const bodyRule = (body) => {
  body('count').required().isNumber().integer();
  body('hint').isString();
  body().strict(); // make sure there aren't any expected properties in the body
};
route.post('/', check.query(queryRule), check.body(bodyRule), otherFunction);
```

If the body content does not pass the given validation check, the validator will return.

```
400 Bad Request

{
    "type": "ValidationError"
    "failures": [
        {
            "parameter": "children[0].prop",
            "value": "zxzx",
            "message": "Invalid value. Value must match required pattern."
        }
    ]
}
```

## Installation

    $ npm install better-validator

## Included Validators

Following are the build-in validators. You may also use your own, see section below.

### required

The various *type* validators will accept the specified type or `null` or `undefined`. To modify the check to not accept
`null` or `undefined`, add the `required()` constraint.

```javascript
validator(value).required();
```

```javascript
validator(value).isString().required();
```

```javascript
validator(value).required().isString();
```

### All Types

```javascript
validator(value).isEqual(7);
```

```javascript
validator(value).notEqual('test');
```

### isObject

Used to validate that the value under test is an object, and to check it's properties.

```javascript
validator(value).isObject((obj) => {
  obj('count').required().isNumber().integer();
  obj('hint').isString();
});
```

To ensure that the object has **only** the expected properties, the `strict()` constraint is added.

```javascript
validator(value).isObject((obj) => {
  obj('count').required().isNumber().integer();
  obj('hint').isString();
}).strict();
```

### isString

Makes sure the value is of type string.

```javascript
validator(value).isString();
```

```javascript
validator(value).isString().isEmail();
```

#### isString Checks

Checks from the library [validator](https://www.npmjs.com/package/validator) are included. Please see the link for more details.
All checks that start with `is` are mounted into the `isString()` module along with their inverse `not`

* `isAfter(date)`, `notAfter(date)`
* `isAlpha(locale)`, `notAlpha(locale)`
* `isAlphanumeric(locale)`, `notAlphanumeric(locale)`
* `isAscii()`, `notAscii()`
* `isBase64()`, `notBase64()`
* `isBefore(date)`, `notBefore(date)`
* `isBoolean()`, `notBoolean()`
* `isByteLength(options)`, `notByteLength(options)`
* `isCreditCard()`, `notCreditCard()`
* `isCurrency(options)`, `notCurrency(options)`
* `isDataURI()`, `notDataURI()`
* `isDate()`, `notDate()`
* `isDecimal()`, `notDecimal()`
* `isDivisibleBy(number)`, `notDivisibleBy(number)`
* `isEmail(options)`, `notEmail(options)`
* `isEmpty()`, `notEmpty()`
* `isFQDN(options)`, `notFQDN(options)`
* `isFloat(options)`, `notFloat(options)`
* `isFullWidth()`, `notFullWidth()`
* `isHalfWidth()`, `notHalfWidth()`
* `isHexColor()`, `notHexColor()`
* `isHexadecimal()`, `notHexadecimal()`
* `isIP(version)`, `notIP(version)`
* `isISBN(version)`, `notISBN(version)`
* `isISSN(options)`, `notISSN(options)`
* `isISIN()`, `notISIN()`
* `isISO8601()`, `notISO8601()`
* `isIn(values)`, `notIn(values)`
* `isInt(options)`, `notInt(options)`
* `isJSON()`, `notJSON()`
* `isLength(options)`, `notLength(options)`
* `isLowercase()`, `notLowercase()`
* `isMACAddress()`, `notMACAddress()`
* `isMD5()`, `notMD5()`
* `isMobilePhone(locale)`, `notMobilePhone(locale)`
* `isMongoId()`, `notMongoId()`
* `isMultibyte()`, `notMultibyte()`
* `isNumeric()`, `notNumeric()`
* `isSurrogatePair()`, `notSurrogatePair()`
* `isURL(options)`, `notURL(options)`
* `isUUID(version)`, `notUUID(version)`
* `isUppercase()`, `notUppercase()`
* `isVariableWidth()`, `notVariableWidth()`
* `isWhitelisted(chars)`, `notWhitelisted(chars)`

Also regular expression checks can be performed with `isMatch(regex)` and `notMatch(regex)`

Like all other constraints, these amy be chained together:

```javascript
validator(value).isAlphanumeric().isLowercase();
```

### isNumber

Makes sure the value is a number.

```javascript
validator(value).isNumber();
```

```javascript
validator(value).isNumber().integer();
```

#### isNumber Checks

* `integer()`
* `isInRange(lower, upper)`, `notInRange(lower, upper)`
* `gt(threshold)`
* `gte(threshold)`
* `lt(threshold)`
* `lte(threshold)`
* `isPositive()`, `notPositive()`
* `isNegative()`, `notNegative()`
* `isZero()`, `notZero()`

### isArrayOf

Makes sure that the item is of type array, and validates the items. Also can specify minimum and maximum length of the array.
TODO
```javascript
validator(value).isArrayOf((item) => {
});
```

## Your Own Validators
TODO

## Formatting Result / Errors

## i18n

## License

(The MIT License)

Copyright (c) 2013

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
