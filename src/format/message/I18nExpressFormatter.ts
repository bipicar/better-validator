import * as _ from 'underscore';

const DEFAULT_OPTIONS = {
  lookupPrefix: '',
  messageElement: 'message',
};

export class I18nExpressFormatter {
  protected options: any;

  /**
   * Create new message formatter
   * @param {object} [options] - options
   * @param {string} [options.messageElement] - name of formatted path property, default = 'message'
   * @param {string} [options.lookupPrefix] - prefix used when passing failure to i18n, default = ''
   */
  constructor(options) {
    this.options = _.defaults({}, options, DEFAULT_OPTIONS);
  }

  /**
   * Format validation failure object
   * @param {object} failure - validation failure
   * @param {object} req - express req object
   * @return {object} formatted failure
   */
  public format(failure, req) {
    failure[this.options.messageElement] = req.__(this.options.lookupPrefix + failure.failed, failure);
    return failure;
  }
}
