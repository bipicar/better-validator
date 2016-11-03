const validator = require('validator');

const Base = require('./base');

module.exports = class IsString extends Base {
  constructor(path) {
    super(path);

    for (const key of Object.keys(validator)) {
      if (!/^is/.test(key)) continue;
      const fn = validator[key];
      if (typeof fn !== 'function') continue;

      this[key] = (...args) => {
        this.satisfies(key, (value) => Base.hasValue(value) && fn.call(validator, value, ...args));
        return this;
      };

      const notKey = `not${key.slice(2)}`;
      this[notKey] = (...args) => {
        this.satisfies(notKey, (value) => !Base.hasValue(value) || !fn.call(validator, value, ...args));
        return this;
      };
    }
  }

  isMatch(regex) {
    this.satisfies('isMatch', (value) => regex.test(value));
    return this;
  }

  notMatch(regex) {
    this.satisfies('notMatch', (value) => !regex.test(value));
    return this;
  }
};
