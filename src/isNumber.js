const Base = require('./base');

module.exports = class IsNumber extends Base {
  constructor(path) {
    super(path);
  }

  integer() {
    this.satisfies('integer', (value) => !Base.hasValue(value) || /^-?\d+$/.test(value));
    return this;
  }

  isInRange(lower, upper) {
    this.satisfies('isInRange', (value) => !Base.hasValue(value) || (lower === undefined || value >= lower) && (upper === undefined || value <= upper));
    return this;
  }

  notInRange(lower, upper) {
    this.satisfies('notInRange', (value) => !Base.hasValue(value) || (lower === undefined || value <= lower) && (upper === undefined || value >= upper));
    return this;
  }

  gt(threshold) {
    this.satisfies('gt', (value) => !Base.hasValue(value) || value > threshold);
    return this;
  }

  gte(threshold) {
    this.satisfies('gte', (value) => !Base.hasValue(value) || value >= threshold);
    return this;
  }

  lt(threshold) {
    this.satisfies('lt', (value) => !Base.hasValue(value) || value < threshold);
    return this;
  }

  lte(threshold) {
    this.satisfies('lte', (value) => !Base.hasValue(value) || value <= threshold);
    return this;
  }

  isPositive() {
    this.satisfies('isPositive', (value) => !Base.hasValue(value) || value > 0);
    return this;
  }

  notPositive() {
    this.satisfies('notPositive', (value) => !Base.hasValue(value) || value <= 0);
    return this;
  }

  isNegative() {
    this.satisfies('isNegative', (value) => !Base.hasValue(value) || value < 0);
    return this;
  }

  notNegative() {
    this.satisfies('notNegative', (value) => !Base.hasValue(value) || value >= 0);
    return this;
  }

  isZero() {
    this.satisfies('isZero', (value) => !Base.hasValue(value) || value === 0);
    return this;
  }

  notZero() {
    this.satisfies('notZero', (value) => !Base.hasValue(value) || value !== 0);
    return this;
  }
};
