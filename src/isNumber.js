const Base = require('./base');

module.exports = class IsNumber extends Base {
  constructor(path) {
    super(path);
  }

  integer() {
    this.satisfies('integer', (value) => /^-?\d+$/.test(value));
    return this;
  }

  isInRange(lower, upper) {
    this.satisfies('isInRange', (value) => (lower === undefined || value >= lower) && (upper === undefined || value <= upper));
    return this;
  }

  notInRange(lower, upper) {
    this.satisfies('notInRange', (value) => (lower === undefined || value <= lower) && (upper === undefined || value >= upper));
    return this;
  }

  gt(threshhold) {
    this.satisfies('gt', (value) => value > threshhold);
    return this;
  }

  gte(threshhold) {
    this.satisfies('gte', (value) => value >= threshhold);
    return this;
  }

  lt(threshhold) {
    this.satisfies('lt', (value) => value < threshhold);
    return this;
  }

  lte(threshhold) {
    this.satisfies('lte', (value) => value <= threshhold);
    return this;
  }

  isPositive() {
    this.satisfies('isPositive', (value) => value > 0);
    return this;
  }

  notPositive() {
    this.satisfies('notPositive', (value) => !Base.hasValue(value) || value <= 0);
    return this;
  }

  isNegative() {
    this.satisfies('isNegative', (value) => value < 0);
    return this;
  }

  notNegative() {
    this.satisfies('notNegative', (value) => !Base.hasValue(value) || value >= 0);
    return this;
  }

  isZero() {
    this.satisfies('isZero', (value) => value === 0);
    return this;
  }

  notZero() {
    this.satisfies('notZero', (value) => value !== 0);
    return this;
  }
};
