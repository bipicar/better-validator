/// <reference types="underscore" />

import * as _ from 'underscore';

export class Helpers {
  static format(formatter, value) {
    return _.isFunction(formatter)
      ? formatter(value)
      : _.isObject(formatter)
      ? formatter.format(value)
      : value;
  }
}
