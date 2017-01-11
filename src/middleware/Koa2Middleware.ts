/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from '../Base';
import {Helpers} from '../Helpers';
import {IsObject} from '../IsObject';
import {IsString} from '../IsString';
import {ValidatorFactory} from '../ValidatorFactory';
import {ObjectValidator, StringObjectValidator} from '../IsObject';

export class Koa2Middleware {
  options: any;

  constructor(options) {
    this.options = _.defaults({}, options);
  }

  query(rule: StringObjectValidator) {
    const self = this;
    return async (ctx, next) => {
      const validator = new ValidatorFactory(self.options);
      const anythingValidator = validator.create(ctx.query).display('?');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      await self.checkErrors(validator, ctx, next);
    };
  }

  body(rule: ObjectValidator) {
    const self = this;
    return async (ctx, next) => {
      const validator = new ValidatorFactory(self.options);
      validator.create(ctx.request.body).isObject(rule);
      await self.checkErrors(validator, ctx, next);
    };
  }

  params(rule: StringObjectValidator) {
    const self = this;
    return async (ctx, next) => {
      const validator = new ValidatorFactory(self.options);
      const anythingValidator = validator.create(ctx.params).display('@');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      await self.checkErrors(validator, ctx, next);
    };
  }

  async checkErrors(validator, ctx, next) {
    const failures = validator.run();
    if (!failures || !failures.length) {
      await next();
      return;
    }

    ctx.status = 400;
    ctx.body = Helpers.format(this.options.responseFormatter,
      _.map(failures, (failure) => Helpers.format(this.options.translationFormatter, failure, ctx))
    );
  }
}
