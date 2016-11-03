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

validator(query).required().isObject((child) => {
  child('count').required().isNumber().integer(); // pass
  child('hint').isString(); // fail
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
const check = Validator.expressMiddleware();
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


TODO: BELOW HERE

Using with koa.js

```javascript
const check = Validator.koaMiddleware();
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
    "errors": [
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

### isObject

Used to validate that the item under test is an object, and to check it's properties. This is often the root validator.

Property requirements are chained to the `isObject` validator.

```javascript
var check = validator.isObject()
  .withRequired('requiredProperty', propertyValidator1)
  .withOptional('optionalProperty', propertyValidator2);
```

If any properties are present in the object under test that are not listed, this will fail the validation.

The property validators may be any other validator, including `isObject`, or may omitted to allow any value.

### isAnyObject

Similar to `isObject`, however does not fail for unexpected properties.

### isString

Makes sure the item is of type string, also can check the value against a regular expression.

```javascript
var check = validator.isString();
```
or
```javascript
var check = validator.isString({regex: /[0-9A-Fa-f]+/, message: 'Invalid value. Value must be hex.'});
```

### isStringOrNull

Makes sure the item is of type string or equal to null, also can check the value against a regular expression.

```javascript
var check = validator.isStringOrNull();
```
or
```javascript
var check = validator.isArray(validator.isStringOrNull({regex: /[0-9A-Fa-f]+/, message: 'Invalid value. Value must be hex.'}));
```

### isNumber

Makes sure the item is a number, also can specify minimum and maximum values.

```javascript
var check = validator.isNumber();
```
or
```javascript
var check = validator.isNumber({min: 0, max: 78});
```

### isInteger

Makes sure the item is a whole number (integer), also can specify minimum and maximum values.

```javascript
var check = validator.isInteger();
```
or
```javascript
var check = validator.isInteger({min: 0, max: 78});
```

### isDate

Checks for a `Date` object or a string that is moment.js can parse.

```javascript
var check = validator.isDate();
```

Optionally, the moment.js format can be passed through to specify a particular format

```javascript
var check = validator.isDate();
```
or
```javascript
var check = validator.isDate({format: 'LT'});
```

### isIsoDate

A shortcut for `validator.isDate({format: 'YYYY-MM-DD'})`

### isArray

Makes sure that the item is of type array, and validates the items. Also can specify minimum and maximum length of the array.

```javascript
var check = validator.isArray(validator.isDate());
```
or
```javascript
var check = validator.isArray(validator.isDate(), {min: 3});
```

## Your Own Validators

You may use your own validators. All that is required is a function that meets the below requirements.

```javascript
function myValidator(value, onError) {
  ...
}
```

Where `value` is the item under test, and `onError` is a function to call with any validation errors. It has the signature:

```javascript
function onError(message,propertyName,propertyValue) {
  ...
}
```

Example: to make sure that there can not be both properties `foo` and `bar`

```javascript
function validateFooXorBar(value, onError) {
  if (value.foo !== undefined && value.bar !== undefined) {
    onError('both foo and bar may not be defined', 'foo|bar', null);
  }
}
```

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
