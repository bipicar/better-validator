/// <reference path="../../typings/underscore/underscore.d.ts" />

import * as _ from 'underscore';
import {Base} from '../base';
import {Helpers} from '../helpers';
import {ValidatorFactory} from '../validatorFactory';
import {IsObject} from '../isObject';
import {IsString} from '../isString';

export class ExpressMiddleware {
  options:any;

  constructor(options) {
    this.options = _.defaults({}, options);
  }

  query(rule) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(req.query).display('?');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      this.checkErrors(validator, res, next);
    }
  }

  body(rule) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      validator.create(req.body).isObject(rule);
      this.checkErrors(validator, res, next);
    }
  }

  checkErrors(validator, res, next) {
    const failures = validator.run();
    if (!failures || !failures.length) {
      next();
      return;
    }

    res.status(400).send(Helpers.format(this.options.responseFormatter, failures));
  }
}
