const _ = require('underscore');

module.exports = class Base {
  constructor(path) {
    this.path = _.isArray(path) && path || path && [path] || [];
    this.tests = [];
  }

  static hasValue(value) {
    return value !== undefined && value !== null;
  }

  display(path) {
    this.path.push(path);
    return this;
  }

  required() {
    const child = new this.constructor(this.path);
    this.satisfies('required', (value) => value !== undefined && value != null && child.test(value));
    return child;
  }

  satisfies(name, rule) {
    this.tests.push({name, rule});
    return this;
  }

  test(value) {
    const failures = [];
    for (const test of this.tests) {
      const results = test.rule(value);

      if (_.isArray(results)) {
        for (const result of results) {
          failures.push(result);
        }
      } else {
        if (results) continue;

        // failed
        failures.push({
          path: this.path,
          test: test.name,
          rule: test.rule,
          value
        });
      }
    }
    return failures;
  }
};
