import * as _ from 'underscore';

export namespace Helpers {
  export function format(formatter, value, ...args) {
    return _.isFunction(formatter)
      ? formatter(value, ...args)
      : _.isObject(formatter)
        ? formatter.format(value, ...args)
        : value;
  }
}
