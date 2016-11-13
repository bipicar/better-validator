/// <reference path="../typings/underscore/underscore.d.ts" />

import * as _ from "underscore";
import {Base} from "./base";
import {Helpers} from "./helpers";
import {IsAnything} from "./isAnything";

const DEFAULT_OPTIONS = {
  failureFormatter: null,
  responseFormatter: null
};

export class ValidatorFactory {
  options:any;
  tests:{validator:Base, value:any}[];
  static __defaultOptions:any;

  constructor(options) {
    this.options = _.defaults({}, options, ValidatorFactory.defaultOptions, DEFAULT_OPTIONS);
    this.tests = [];
    // const factory = (value, rules) => {
    //   const test = {
    //     validator: new IsAnything(null),
    //     value
    //   };
    //
    //   if (rules && _.isFunction(rules)) {
    //     rules(test.validator);
    //     return test.validator.test(test.value);
    //   }
    //
    //   this.tests.push(test);
    //   return test.validator;
    // };
    // factory.run = this.run.bind(this);
    // return factory;
  }

  create(value:any):IsAnything {
    const test = {
      validator: new IsAnything(null),
      value
    };

    this.tests.push(test);
    return test.validator;
  }

  createAndRun(value:any, rules:(validator:Base) => void):any[] { // TODO type
    const test = {
      validator: new IsAnything(null),
      value
    };

    rules(test.validator);
    return test.validator.test(test.value);
  }

  run() {
    const failures = _.flatten(_.map(this.tests, (test) => test.validator.test(test.value)));

    const formatter = this.options.failureFormatter;
    if (!formatter) {
      return failures;
    }

    return _.map(failures, (failure) => {
      return Helpers.format(formatter, failure);
    });
  }

  static get defaultOptions() {
    return ValidatorFactory.__defaultOptions;
  }

  static set defaultOptions(value) {
    ValidatorFactory.__defaultOptions = value;
  }
}
