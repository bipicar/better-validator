/// <reference types="underscore" />

import * as _ from 'underscore';

const DEFAULT_OPTIONS = {
  wrapperElement: 'failures',
  staticTemplate: {
    type: 'ValidationError'
  }
};

export class WrapperFormatter {
  options: any;

  /**
   * Create wrapper formatter
   * @param {object} [options] - options
   * @param {string} [options.wrapperElement] - wrapper element name, default = 'failures'
   * @param {object} [options.staticTemplate] - static response template into which the wrapped failures will be injected, default = {type: 'ValidationError'}
   */
  constructor(options) {
    this.options = _.defaults({}, options, DEFAULT_OPTIONS);
  }

  /**
   * Format path
   * @param {object[]} failures - array of failures
   * @return {string} formatted response
   */
  format(failures) {
    return _.extend({}, this.options.staticTemplate, {
      [this.options.wrapperElement]: failures
    });
  }
}
