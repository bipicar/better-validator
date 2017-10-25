import * as _ from 'underscore';

const DEFAULT_OPTIONS = {
  lookupPrefix: '',
  messageElement: 'message',
};

export class I18nKoaFormatter {
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
   * @param {Context} ctx - express req object
   * @return {object} formatted failure
   */
  public format(failure, ctx) {
    failure[this.options.messageElement] = ctx.i18n.__(this.options.lookupPrefix + failure.failed, failure);
    return failure;
  }
}
