import * as _ from 'underscore';
import {Base, IFailure} from './Base';

export declare type ItemValidatorFactory = (path: (string | number)[]) => Base;

export class IsArrayOf extends Base {
  protected itemValidatorFactory: ItemValidatorFactory;
  protected itemValidatorName: string;

  constructor(path: (string | number)[], itemValidatorFactory: ItemValidatorFactory, itemValidatorName: string) {
    super(path);
    this.itemValidatorFactory = itemValidatorFactory;
    this.itemValidatorName = itemValidatorName;

    this.validateArray();
  }

  public length(expected: number): this {
    this.satisfies('length', value => !Base.hasValue(value) || value.length === expected);
    return this;
  }

  public lengthInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('lengthInRange', value => !Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
    return this;
  }

  protected validateArray() {
    this.satisfies('isArray', value => {
      if (value === null || value === undefined) return true;
      if (!_.isArray(value)) return false;

      let failures: IFailure[] = [];
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const path = this.path.slice();
        path.push(i);
        const child = this.itemValidatorFactory(path);
        if (Base.hasValue(item)) {
          failures = failures.concat(child.test(item));
        }
      }
      return failures;
    });
  }
}
