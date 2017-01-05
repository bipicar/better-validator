/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from './Base';
import {Helpers} from './Helpers';
import {IsAnything} from './IsAnything';

const DEFAULT_OPTIONS = {
  failureFormatter: null,
  responseFormatter: null
};

export class ValidatorFactory {
  options: any;
  tests: {validator: Base, value: any}[];
  static defaultOptions: any;

  constructor(options) {
    this.options = _.defaults({}, options, ValidatorFactory.defaultOptions, DEFAULT_OPTIONS);
    this.tests = [];
  }

  create(value: any): IsAnything {
    const test = {
      validator: new IsAnything(null),
      value
    };

    this.tests.push(test);
    return test.validator;
  }

  createAndRun(value: any, rules: (validator: Base) => void): any[] { // TODO type
    const test = {
      validator: new IsAnything(null),
      value
    };

    rules(test.validator);
    return test.validator.test(test.value);
  }

  run() {
    const failures = _.flatten(_.map(this.tests, (test) => test.validator.test(test.value)) as Array<any>);

    const formatter = this.options.failureFormatter;
    if (!formatter) {
      return failures;
    }

    return _.map(failures, (failure) => {
      return Helpers.format(formatter, failure);
    });
  }
}
