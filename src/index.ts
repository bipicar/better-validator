import {Failure} from './base';
import * as format from './format';
import {IsAnything} from './isAnything';
import {ExpressMiddleware} from './middleware/expressMiddleware';
import {KoaMiddleware} from './middleware/koaMiddleware';
import {ValidatorFactory} from './validatorFactory';

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
