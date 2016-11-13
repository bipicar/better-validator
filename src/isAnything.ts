/// <reference path="../typings/underscore/underscore.d.ts" />

import * as _ from 'underscore';
import {Base} from './base';
import {IsNumber} from './isNumber';
import {IsString} from './isString';
import {IsObject} from './isObject';
import {IsArrayOf} from './isArrayOf';

export class IsAnything extends Base {
  constructor(path:(string|number)[]) {
    super(path);
  }

  isNumber() {
    const child = new IsNumber(this.path);
    this.satisfies('isNumber', (value) => (!Base.hasValue(value) || _.isNumber(value)) && (!isNaN(value) || value === undefined) && child.test(value));
    return child;
  }

  isString() {
    const child = new IsString(this.path);
    this.satisfies('isString', (value) => (!Base.hasValue(value) || _.isString(value)) && child.test(value));
    return child;
  }

  isObject(objectValidator) {
    const child = new IsObject(this.path, objectValidator, IsAnything, 'isAnything');
    this.satisfies('isObject', (value) => (!Base.hasValue(value) || _.isObject(value)) && child.test(value));
    return child;
  }

  isArrayOf(childValidator) {
    const factory = (path) => {
      return new IsObject(path, childValidator, IsAnything, 'isAnything');
    };
    const child = new IsArrayOf(this.path, factory, 'isObject');
    this.satisfies('isArrayOf', (value) => (!Base.hasValue(value) || _.isArray(value)) && child.test(value));
    return child;
  }
}
