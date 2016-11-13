import {ExpressMiddleware} from "./middleware/expressMiddleware";
import {KoaMiddleware} from "./middleware/koaMiddleware";
import {ValidatorFactory} from "./validatorFactory";
import {Failure} from "./base";
import {IsAnything} from "./isAnything";

declare type factoryFunction = (value:any, rules?) => IsAnything | Failure[];
declare type tester = {run?:() => Failure[]}

export class Validator {
  constructor(options) {
    const factory = new ValidatorFactory(options);
    const fn:factoryFunction&tester = (value, rules?) => {
      if (rules) {
        return factory.createAndRun(value, rules);
      }
      return factory.create(value);
    };
    fn.run = factory.run.bind(factory);
    return fn;
  }

  static get defaultOptions() {
    return ValidatorFactory.__defaultOptions;
  };

  static set defaultOptions(value) {
    ValidatorFactory.__defaultOptions = value;
  };

  static expressMiddleware(options) {
    return new ExpressMiddleware(options)
  }

  static koaMiddleware(options) {
    return new KoaMiddleware(options)
  }
}
