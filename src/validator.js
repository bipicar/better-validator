const _ = require('underscore');

const Base = require('./base');
const IsAnything = require('./isAnything');
const IsObjectOfString = require('./isObjectOfString');

const DEFAULT_OPTIONS = {
  // error structure
  // message text
  // property name
  // path formatter
};

class ExpressMiddleware {
  constructor(options) {
    this.options = options;
  }

  query(rule) {
    return (req, res, next) => {
      const validator = new Validator(this.options);
      const anythingValidator = validator(req.query).display('?');
      const objectValidator = new IsObjectOfString(anythingValidator.path, rule);
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      this.checkErrors(validator, res, next);
    }
  }

  body(rule) {
    return (req, res, next) => {
      const validator = new Validator(this.options);
      validator(req.body).isObject(rule);
      this.checkErrors(validator, res, next);
    }
  }

  checkErrors(validator, res, next) {
    const errors = validator.run();
    if (!errors || !errors.length) {
      next();
      return;
    }

    res.status(400).send(errors);
  }
}

class KoaMiddleware {
  constructor(options) {
    this.options = options;
  }

  query(rule) {
    return function *(next) {
      const validator = new Validator(this.options);
      const anythingValidator = validator(this.query).display('?');
      const objectValidator = new IsObjectOfString(anythingValidator.path, rule);
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      yield this.checkErrors(validator, this, next);
    }
  }

  body(rule) {
    return function *(next) {
      const validator = new Validator(this.options);
      validator(this.request.body).isObject(rule);
      yield this.checkErrors(validator, this, next);
    }
  }

  *checkErrors(validator, ctx, next) {
    const errors = validator.run();
    if (!errors || !errors.length) {
      yield next();
      return;
    }

    ctx.status(400);
    ctx.body = errors;
  }
}

class Validator {
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
    const failures = _.flatten(_.map(this.tests, (test) => test.validator.test(test.value)));

    const formatter = this.options.failureFormatter;
    if (!formatter) {
      return failures;
    }

    return _.map(failures, (failure) => {
      return _.isFunction(formatter) ? formatter(failure) : formatter.format(failure);
    })
  }

  static get defaultOptions() {
    return Validator.__defaultOptions;
  };

  static set defaultOptions(value) {
    Validator.__defaultOptions = value;
  };

  static expressMiddleware(options) {
    return new ExpressMiddleware(options)
  }

  static koaMiddleware() {
    return new KoaMiddleware(options)
  }
}

module.exports = Validator;
