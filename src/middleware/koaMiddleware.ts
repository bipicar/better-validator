/// <reference path="../../typings/underscore/underscore.d.ts" />

import * as _ from 'underscore';
import {Base} from '../base';
import {Helpers} from '../helpers';
import {ValidatorFactory} from '../validatorFactory';
import {IsObject} from '../isObject';
import {IsString} from '../isString';

export class KoaMiddleware {
  options: any;

  constructor(options) {
    this.options = _.defaults({}, options);
  }

  query(rule) {
    const self = this;
    return function *(next) {
      const validator = new ValidatorFactory(self.options);
      const anythingValidator = validator.create(this.query).display('?');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      yield self.checkErrors(validator, this, next);
    }
  }

  body(rule) {
    const self = this;
    return function *(next) {
      const validator = new ValidatorFactory(self.options);
      validator.create(this.request.body).isObject(rule);
      yield self.checkErrors(validator, this, next);
    }
  }

  *checkErrors(validator, ctx, next) {
    const failures = validator.run();
    if (!failures || !failures.length) {
      yield next;
      return;
    }

    ctx.status = 400;
    ctx.body = Helpers.format(this.options.responseFormatter, failures);
  }
}
