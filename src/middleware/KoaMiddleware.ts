/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from '../Base';
import {Helpers} from '../Helpers';
import {IsObject} from '../IsObject';
import {IsString} from '../IsString';
import {ValidatorFactory} from '../ValidatorFactory';

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
    };
  }

  body(rule) {
    const self = this;
    return function *(next) {
      const validator = new ValidatorFactory(self.options);
      validator.create(this.request.body).isObject(rule);
      yield self.checkErrors(validator, this, next);
    };
  }

  params(rule) {
    const self = this;
    return function *(next) {
      const validator = new ValidatorFactory(self.options);
      const anythingValidator = validator.create(this.params).display('@');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      yield self.checkErrors(validator, this, next);
    };
  }

  *checkErrors(validator, ctx, next) {
    const failures = validator.run();
    if (!failures || !failures.length) {
      yield next;
      return;
    }

    ctx.status = 400;
    ctx.body = Helpers.format(this.options.responseFormatter,
      _.map(failures, (failure) => Helpers.format(this.options.translationFormatter, failure, ctx))
    );
  }
}
