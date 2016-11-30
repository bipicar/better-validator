/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from '../base';
import {Helpers} from '../helpers';
import {IsObject} from '../isObject';
import {IsString} from '../isString';
import {ValidatorFactory} from '../validatorFactory';

export class ExpressMiddleware {
  options: any;

  constructor(options) {
    this.options = _.defaults({}, options);
  }

  query(rule) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(req.query).display('?');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      this.checkErrors(validator, req, res, next);
    };
  }

  body(rule) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      validator.create(req.body).isObject(rule);
      this.checkErrors(validator, req, res, next);
    };
  }

  params(rule) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(req.params).display('@');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      this.checkErrors(validator, req, res, next);
    };
  }

  checkErrors(validator, req, res, next) {
    const failures = validator.run();
    if (!failures || !failures.length) {
      next();
      return;
    }

    res.status(400).send(Helpers.format(this.options.responseFormatter,
      _.map(failures, (failure) => Helpers.format(this.options.translationFormatter, failure, req, res))
    ));
  }
}
