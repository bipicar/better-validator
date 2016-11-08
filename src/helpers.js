const _ = require('underscore');

module.exports = {
  format(formatter, value) {
    return _.isFunction(formatter)
      ? formatter(value)
      : _.isObject(formatter)
      ? formatter.format(value)
      : value;
  }
};
