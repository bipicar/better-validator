const _ = require('underscore');

const DEFAULT_OPTIONS = {
};

class FailureFormatter {
  /**
   * Create new error formatter
   * @param {object} [options] - options
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
  }
}

module.exports = FailureFormatter;
