/// <reference types="validator" />

import * as validator from 'validator';
import {Base} from './base';

export class IsString extends Base {
  constructor(path: (string|number)[]) {
    super(path);

    for (const key of Object.keys(validator)) {
      if (!/^is/.test(key)) continue;
      const fn = validator[key];
      if (typeof fn !== 'function') continue;

      this[key] = (...args) => {
        this.satisfies(key, (value) => !Base.hasValue(value) || fn.call(validator, value, ...args));
        return this;
      };

      const notKey = `not${key.slice(2)}`;
      this[notKey] = (...args) => {
        this.satisfies(notKey, (value) => !Base.hasValue(value) || !fn.call(validator, value, ...args));
        return this;
      };
    }
  }

  isMatch(regex: RegExp): this {
    this.satisfies('isMatch', (value) => !Base.hasValue(value) || regex.test(value));
    return this;
  }

  notMatch(regex: RegExp): this {
    this.satisfies('notMatch', (value) => !Base.hasValue(value) || !regex.test(value));
    return this;
  }
}
