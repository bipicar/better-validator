/// <reference types="underscore" />

import * as _ from 'underscore';

const DEFAULT_OPTIONS = {
  initialSeparator: '',
  separator: '.'
};

export class PathFormatter {
  options: any;

  /**
   * Create new path formatter
   * @param {object} [options] - options
   * @param {string} [options.separator] - path element separator, default = '.'
   * @param {string} [options.initialSeparator] - path element separator for before first element, default = ''
   */
  constructor(options) {
    this.options = _.defaults({}, options, DEFAULT_OPTIONS);
  }

  /**
   * Format path
   * @param {string[]} path - path parts array
   * @return {string} formatted path
   */
  format(path: (string|number)[]) {
    if (!path || !path.length) return '';

    let formatted = '';
    const first = String(path[0]);
    if (/^[\/?:!#$%\^&*@]$/.test(first)) {
      formatted = first;
      path = path.slice(1);
    }

    for (let i = 0; i < path.length; i++) {
      const part = path[i];

      if (typeof part === 'number') {
        formatted += this.formatIndex(part, i, path.length);
      } else if (typeof part === 'string') {
        formatted += this.formatProperty(part, i, path.length);
      }
    }
    return formatted;
  }

  formatIndex(index: number, position: number, length: number) {
    return `[${index}]`;
  }

  formatProperty(property: string, position: number, length: number) {
    return (position > 0 ? this.options.separator : this.options.initialSeparator) + property;
  }
}
