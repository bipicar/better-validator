/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from '../Base';
import {Helpers} from '../Helpers';
import {IsObject} from '../IsObject';
import {IsString} from '../IsString';
import {ValidatorFactory} from '../ValidatorFactory';

export class Koa2Middleware {
  options: any;

  constructor(options) {
    this.options = _.defaults({}, options);
  }

  query(rule) {
    return async (ctx, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(ctx.query).display('?');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      await this.checkErrors(validator, ctx, next);
    };
  }

  body(rule) {
    return async (ctx, next) => {
      const validator = new ValidatorFactory(this.options);
      validator.create(ctx.request.body).isObject(rule);
      await this.checkErrors(validator, ctx, next);
    };
  }

  params(rule) {
    return async (ctx, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(ctx.params).display('@');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', (value) => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      await this.checkErrors(validator, ctx, next);
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
