/// <reference types="underscore" />

import * as _ from 'underscore';

export class Helpers {
  static format(formatter, value, ...args) {
    return _.isFunction(formatter)
      ? formatter(value, ...args)
      : _.isObject(formatter)
      ? formatter.format(value, ...args)
      : value;
  }
}
