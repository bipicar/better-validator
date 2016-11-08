const _ = require('underscore');

const helpers = require('../../helpers');
const PathFormatter = require('../path/pathFormatter');

const DEFAULT_OPTIONS = {
  pathElement: 'parameter',
  pathFormatter: new PathFormatter()
};

class FailureFormatter {
  /**
   * Create new error formatter
   * @param {object} [options] - options
   * @param {string} [options.pathElement] - name of formatted path property, default = 'parameter'
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
      [this.options.pathElement]: helpers.format(this.options.pathFormatter, failure.path),
      value: failure.value,
      test: failure.test
    };
  }
}

module.exports = FailureFormatter;
