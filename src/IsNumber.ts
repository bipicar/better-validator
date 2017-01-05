import {Base} from './Base';

export class IsNumber extends Base {
  constructor(path: (string|number)[]) {
    super(path);
  }

  integer(): this {
    this.satisfies('integer', (value) => !Base.hasValue(value) || /^-?\d+$/.test(String(value)));
    return this;
  }

  isInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('isInRange', (value) => !Base.hasValue(value) || (lower === undefined || value >= lower) && (upper === undefined || value <= upper));
    return this;
  }

  notInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('notInRange', (value) => !Base.hasValue(value) || (lower === undefined || value <= lower) && (upper === undefined || value >= upper));
    return this;
  }

  gt(threshold: number): this {
    this.satisfies('gt', (value) => !Base.hasValue(value) || value > threshold);
    return this;
  }

  gte(threshold: number): this {
    this.satisfies('gte', (value) => !Base.hasValue(value) || value >= threshold);
    return this;
  }

  lt(threshold: number): this {
    this.satisfies('lt', (value) => !Base.hasValue(value) || value < threshold);
    return this;
  }

  lte(threshold: number): this {
    this.satisfies('lte', (value) => !Base.hasValue(value) || value <= threshold);
    return this;
  }

  isPositive(): this {
    this.satisfies('isPositive', (value) => !Base.hasValue(value) || value > 0);
    return this;
  }

  notPositive(): this {
    this.satisfies('notPositive', (value) => !Base.hasValue(value) || value <= 0);
    return this;
  }

  isNegative(): this {
    this.satisfies('isNegative', (value) => !Base.hasValue(value) || value < 0);
    return this;
  }

  notNegative(): this {
    this.satisfies('notNegative', (value) => !Base.hasValue(value) || value >= 0);
    return this;
  }

  isZero(): this {
    this.satisfies('isZero', (value) => !Base.hasValue(value) || value === 0);
    return this;
  }

  notZero(): this {
    this.satisfies('notZero', (value) => !Base.hasValue(value) || value !== 0);
    return this;
  }
}
