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
    if (path !== null && path !== undefined) {
      this.path.push(path);
    }
    return this;
  }

  required() {
    const child = new this.constructor(this.path);
    this.satisfies('required', (value) => Base.hasValue(value) && child.test(value));
    return child;
  }

  isEqual(expected) {
    this.satisfies('isEqual', (value) => value === expected);
    return this;
  }

  notEqual(expected) {
    this.satisfies('notEqual', (value) => value !== expected);
    return this;
  }

  satisfies(name, rule) {
    this.tests.push({name, rule});
    return this;
  }

  check(rule) {
    return rule && rule(this) || this;
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
          failed: test.name,
          rule: test.rule,
          value
        });
      }
    }
    return failures;
  }
};
