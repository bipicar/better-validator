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

  gt(threshold) {
    this.satisfies('gt', (value) => value > threshold);
    return this;
  }

  gte(threshold) {
    this.satisfies('gte', (value) => value >= threshold);
    return this;
  }

  lt(threshold) {
    this.satisfies('lt', (value) => value < threshold);
    return this;
  }

  lte(threshold) {
    this.satisfies('lte', (value) => value <= threshold);
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
