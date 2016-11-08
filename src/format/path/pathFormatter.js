const _ = require('underscore');

const DEFAULT_OPTIONS = {
  separator: '.',
  initialSeparator: ''
};

class PathFormatter {
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
  format(path) {
    if (!path || !path.length) return '';

    let formatted = '';
    if (path[0] === '?') {
      formatted = '?';
      path = path.slice(1);
    }

    for (let i = 0; i < path.length; i++) {
      const part = path[i];

      if (_.isNumber(part)) {
        formatted += this.formatIndex(part, i, path.length);
      } else {
        formatted += this.formatProperty(part, i, path.length);
      }
    }
    return formatted;
  }

  formatIndex(index, position, length) {
    return `[${index}]`;
  }

  formatProperty(property, position, length) {
    return (position > 0 ? this.options.separator : this.options.initialSeparator) + property;
  }
}

module.exports = PathFormatter;
