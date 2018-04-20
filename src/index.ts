import {IFailure} from './Base';
import * as format from './format';
import {IsAnything} from './IsAnything';
import {ExpressMiddleware} from './middleware/ExpressMiddleware';
import {Koa2Middleware} from './middleware/Koa2Middleware';
import {KoaMiddleware} from './middleware/KoaMiddleware';
import {ValidatorFactory} from './ValidatorFactory';

declare type factoryRunFunction = (value: any, rules) => IsAnything | IFailure[];
declare type factoryFunction = (value: any) => IsAnything;
// tslint:disable-next-line:interface-over-type-literal
declare type tester = {run?: () => IFailure[]};

class Validator {
  public static default = Validator;

  public static expressMiddleware(options) {
    return new ExpressMiddleware(options);
  }

  public static koaMiddleware(options) {
    return new KoaMiddleware(options);
  }

  public static koa2Middleware(options) {
    return new Koa2Middleware(options);
  }

  public static create(options?): ((value: any) => IsAnything) & ({run: () => IFailure[]}) {
    const factory = new ValidatorFactory(options);
    const fn: factoryFunction & tester = value => {
      return factory.create(value);
    };
    fn.run = factory.run.bind(factory);
    return fn as any;
  }

  public static get format() {
    return format;
  }

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
}

export = Validator;
