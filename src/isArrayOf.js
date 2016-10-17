const Base = require('./base');

module.exports = class IsArrayOf extends Base {
  constructor(path, childValidator) {
    super(path);
    this.childValidator = childValidator;
  }

  strict() {

    return this;
  }
};
