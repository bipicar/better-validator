/// <reference types="underscore" />

import * as _ from "underscore";
import {Base} from "./base";

export declare type objectValidator = (childValidator) => void;
export declare type itemValidatorFactory = (path: (string|number)[]) => Base;

export class IsArrayOf extends Base {
  itemValidatorFactory: itemValidatorFactory;
  itemValidatorName: string;

  constructor(path: (string|number)[], itemValidatorFactory: itemValidatorFactory, itemValidatorName: string) {
    super(path);
    this.itemValidatorFactory = itemValidatorFactory;
    this.itemValidatorName = itemValidatorName;

    this.validateArray();
  }

  validateArray() {
    this.satisfies('isArray', (value) => {
      if (!_.isArray(value)) return false;

      let passed = true;
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const path = this.path.slice();
        path.push(i);
        const child = this.itemValidatorFactory(path);
        passed = passed && (!Base.hasValue(item) || child.test(item));
      }
      return passed;
    });
  }

  length(expected: number): this {
    this.satisfies('length', (value) => !Base.hasValue(value) || value.length === expected);
    return this;
  }

  lengthInRange(lower: number, upper: number): this {
    this.satisfies('lengthInRange', (value) => !Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
    return this;
  }
}
