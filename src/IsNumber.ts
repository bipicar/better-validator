import {Base} from './Base';

export class IsNumber extends Base {
  constructor(path: (string | number)[]) {
    super(path);
  }

  public integer(): this {
    this.satisfies('integer', value => !Base.hasValue(value) || /^-?\d+$/.test(String(value)));
    return this;
  }

  public isInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('isInRange', value => !Base.hasValue(value) || (lower === undefined || value >= lower) && (upper === undefined || value <= upper));
    return this;
  }

  public notInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('notInRange', value => !Base.hasValue(value) || (lower === undefined || value <= lower) && (upper === undefined || value >= upper));
    return this;
  }

  public gt(threshold: number): this {
    this.satisfies('gt', value => !Base.hasValue(value) || value > threshold);
    return this;
  }

  public gte(threshold: number): this {
    this.satisfies('gte', value => !Base.hasValue(value) || value >= threshold);
    return this;
  }

  public lt(threshold: number): this {
    this.satisfies('lt', value => !Base.hasValue(value) || value < threshold);
    return this;
  }

  public lte(threshold: number): this {
    this.satisfies('lte', value => !Base.hasValue(value) || value <= threshold);
    return this;
  }

  public isPositive(): this {
    this.satisfies('isPositive', value => !Base.hasValue(value) || value > 0);
    return this;
  }

  public notPositive(): this {
    this.satisfies('notPositive', value => !Base.hasValue(value) || value <= 0);
    return this;
  }

  public isNegative(): this {
    this.satisfies('isNegative', value => !Base.hasValue(value) || value < 0);
    return this;
  }

  public notNegative(): this {
    this.satisfies('notNegative', value => !Base.hasValue(value) || value >= 0);
    return this;
  }

  public isZero(): this {
    this.satisfies('isZero', value => !Base.hasValue(value) || value === 0);
    return this;
  }

  public notZero(): this {
    this.satisfies('notZero', value => !Base.hasValue(value) || value !== 0);
    return this;
  }
}
