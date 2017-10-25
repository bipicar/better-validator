import * as _ from 'underscore';

import {Helpers} from '../../Helpers';
import {PathFormatter} from '../path';

const DEFAULT_OPTIONS = {
  pathElement: 'parameter',
  pathFormatter: new PathFormatter(null),
};

export class FailureFormatter {
  protected options: any;

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
  public format(failure) {
    return {
      [this.options.pathElement]: Helpers.format(this.options.pathFormatter, failure.path),
      failed: failure.failed,
      value: failure.value,
    };
  }
}
