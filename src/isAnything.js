const _ = require('underscore');

const Base = require('./base');
const IsNumber = require('./isNumber');
const IsString = require('./isString');
const IsObject = require('./isObject');
const IsArrayOf = require('./isArrayOf');

module.exports = class IsAnything extends Base {
  constructor(path) {
    super(path);
  }

  isNumber() {
    const child = new IsNumber(this.path);
    this.satisfies('isNumber', (value) => (!Base.hasValue(value) || _.isNumber(value)) && (!isNaN(value) || value === undefined) && child.test(value));
    return child;
  }

  isString() {
    const child = new IsString(this.path);
    this.satisfies('isString', (value) => (!Base.hasValue(value) || _.isString(value)) && child.test(value));
    return child;
  }

  isObject(objectValidator) {
    const child = new IsObject(this.path, objectValidator);
    this.satisfies('isObject', (value) => (!Base.hasValue(value) || _.isObject(value)) && child.test(value));
    return child;
  }

  isArrayOf(childValidator) {
    const child = new IsArrayOf(this.path, childValidator); // TODO validate children
    this.satisfies('isArrayOf', (value) => (!Base.hasValue(value) || _.isArray(value)) && child.test(value));
    return child;
  }
};
