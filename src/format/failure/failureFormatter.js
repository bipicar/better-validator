const _ = require('underscore');

const PathFormatter = require('../path/pathFormatter');

const DEFAULT_OPTIONS = {
  pathName: 'parameter',
  pathFormatter: new PathFormatter()
};

class FailureFormatter {
  /**
   * Create new error formatter
   * @param {object} [options] - options
   * @param {string} [options.pathName] - name of formatted path property, default = 'parameter'
   * @param {function|object} [options.pathFormatter] - path formatter, default format 'foo[0].bar'
   */
  constructor(options) {
    this.options = _.defaults({}, options, DEFAULT_OPTIONS);
  }

  /**
   * Format validation failure object
   * @param {object} failure - validation failure
   * @return {object} formatted failure
   */
  format(failure) {
    return {
      [this.options.pathName]: _.isFunction(this.options.pathFormatter)
        ? this.options.pathFormatter(failure.path)
        : this.options.pathFormatter.format(failure.path),
      value: failure.value,
      test: failure.test
    };
  }
}

module.exports = FailureFormatter;
