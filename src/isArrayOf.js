const _ = require('underscore');

const Base = require('./base');

module.exports = class IsArrayOf extends Base {
  constructor(path, objectValidator) {
    super(path);
    this.objectValidator = objectValidator;

    this.validateArray(objectValidator);
  }

  validateArray(objectValidator) {
    if (!objectValidator) return this;

    const IsObject = require('./isObject');
    this.satisfies('isArray', (value) => {
      if (!_.isArray(value)) return false;

      let passed = true;
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const path = this.path.slice();
        path.push(i);
        const child = new IsObject(path, objectValidator);
        passed = passed && (!Base.hasValue(item) || child.test(item));
      }
      return passed;
    });
  }

  length(expected) {
    this.satisfies('length', (value) => !Base.hasValue(value) || value.length === expected);
    return this;
  }

  lengthInRange(lower, upper) {
    this.satisfies('lengthInRange', (value) => !Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
    return this;
  }
};
