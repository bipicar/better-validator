/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from './base';
import {IsArrayOf} from './isArrayOf';
import {IsNumber} from './isNumber';
import {IsObject, objectValidator} from './isObject';
import {IsString} from './isString';
import {IsBoolean} from './isBoolean';

export class IsAnything extends Base {
  constructor(path: (string|number)[] | null) {
    super(path);
  }

  isNumber() {
    const child = new IsNumber(this.path);
    this.satisfies('isNumber', (value) => (!Base.hasValue(value) || _.isNumber(value)) && (!isNaN(value) || value === undefined) && child.test(value));
    return child;
  }

  isBoolean() {
    const child = new IsBoolean(this.path);
    this.satisfies('isBoolean', (value) => (!Base.hasValue(value) || _.isBoolean(value)) && child.test(value));
    return child;
  }

  isString() {
    const child = new IsString(this.path);
    this.satisfies('isString', (value) => (!Base.hasValue(value) || _.isString(value)) && child.test(value));
    return child;
  }

  isObject(objectValidator: objectValidator) {
    const child = new IsObject(this.path, objectValidator, IsAnything, 'isAnything');
    this.satisfies('isObject', (value) => (!Base.hasValue(value) || _.isObject(value)) && child.test(value));
    return child;
  }

  isObjectArray(childValidator: objectValidator) {
    const factory = (path) => {
      return new IsObject(path, childValidator, IsAnything, 'isAnything');
    };
    const child = new IsArrayOf(this.path, factory, 'isObject');
    this.satisfies('isObjectArray', (value) => (!Base.hasValue(value) || _.isArray(value)) && child.test(value));
    return child;
  }

  isArray(childValidator: objectValidator) {
    const factory = (path) => {
      const itemValidator = new IsAnything(path);
      childValidator(itemValidator);
      return itemValidator;
    };
    const child = new IsArrayOf(this.path, factory, 'isObject');
    this.satisfies('isArray', (value) => (!Base.hasValue(value) || _.isArray(value)) && child.test(value));
    return child;
  }
}
