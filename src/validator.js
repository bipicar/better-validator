const _ = require('underscore');

const IsAnything = require('./isAnything');

const DEFAULT_OPTIONS = {
  // error structure
  // message text
  // property name
  // path formatter
};

module.exports = class Validator {
  constructor(options) {
    this.options = _.defaults({}, options, Validator.defaultOptions, DEFAULT_OPTIONS);
    this.tests = [];
    const factory = (value, rules) => {
      const test = {
        validator: new IsAnything(),
        value
      };

      if (rules && _.isFunction(rules)) {
        rules(test.validator)
        return test.validator.test(test.value);
      }

      this.tests.push(test);
      return test.validator;
    };
    factory.run = this.run.bind(this);
    return factory;
  }

  run() {
    return _.flatten(_.map(this.tests, (test) => test.validator.test(test.value)));
  }

  static get defaultOptions() {
    return Validator.__defaultOptions;
  };

  static set defaultOptions(value) {
    Validator.__defaultOptions = value;
  };
};
