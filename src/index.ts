import {Failure} from './Base';
import * as format from './format';
import {IsAnything} from './IsAnything';
import {ExpressMiddleware} from './middleware/ExpressMiddleware';
import {KoaMiddleware} from './middleware/KoaMiddleware';
import {Koa2Middleware} from './middleware/Koa2Middleware';
import {ValidatorFactory} from './ValidatorFactory';

declare type factoryRunFunction = (value: any, rules) => IsAnything | Failure[];
declare type factoryFunction = (value: any) => IsAnything;
declare type tester = {run?: () => Failure[]};

class Validator {
  constructor(options) {
    const factory = new ValidatorFactory(options);
    const fn: factoryRunFunction & tester = (value, rules?) => {
      if (rules) {
        return factory.createAndRun(value, rules);
      }
      return factory.create(value);
    };
    fn.run = factory.run.bind(factory);
    return fn;
  }

  static expressMiddleware(options) {
    return new ExpressMiddleware(options);
  }

  static koaMiddleware(options) {
    return new KoaMiddleware(options);
  }

  static koa2Middleware(options) {
    return new Koa2Middleware(options);
  }

  static create(options?) {
    const factory = new ValidatorFactory(options);
    const fn: factoryFunction & tester = (value) => {
      return factory.create(value);
    };
    fn.run = factory.run.bind(factory);
    return fn;
  }

  static get format() {
    return format;
  }

  static default = Validator;
}

export = Validator;
