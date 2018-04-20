import * as _ from 'underscore';
import {Base} from './Base';
import {IsArrayOf} from './IsArrayOf';
import {IsBoolean} from './IsBoolean';
import {IsNumber} from './IsNumber';
import {IsObject, ObjectValidator} from './IsObject';
import {IsString} from './IsString';

export declare type ArrayValidator = (validator: IsAnything) => void;

export class IsAnything extends Base {
  constructor(path: (string | number)[] | null) {
    super(path);
  }

  public isNumber() {
    const child = new IsNumber(this.path);
    this.satisfies('isNumber', value => (!Base.hasValue(value) || _.isNumber(value)) && (!isNaN(value) || value === undefined) && child.test(value));
    return child;
  }

  public isBoolean() {
    const child = new IsBoolean(this.path);
    this.satisfies('isBoolean', value => (!Base.hasValue(value) || _.isBoolean(value)) && child.test(value));
    return child;
  }

  public isString() {
    const child = new IsString(this.path);
    this.satisfies('isString', value => (!Base.hasValue(value) || _.isString(value)) && child.test(value));
    return child;
  }

  public isObject(objectValidator: ObjectValidator) {
    const child = new IsObject(this.path, objectValidator, IsAnything, 'isAnything');
    this.satisfies('isObject', value => (!Base.hasValue(value) || _.isObject(value)) && child.test(value));
    return child;
  }

  public isObjectArray(childValidator: ObjectValidator) {
    const factory = path => {
      return new IsObject(path, childValidator, IsAnything, 'isAnything');
    };
    const child = new IsArrayOf(this.path, factory, 'isObject');
    this.satisfies('isObjectArray', value => (!Base.hasValue(value) || _.isArray(value)) && child.test(value));
    return child;
  }

  public isArray(childValidator: ArrayValidator) {
    const factory = path => {
      const itemValidator = new IsAnything(path);
      childValidator(itemValidator);
      return itemValidator;
    };
    const child = new IsArrayOf(this.path, factory, 'isObject');
    this.satisfies('isArray', value => (!Base.hasValue(value) || _.isArray(value)) && child.test(value));
    return child;
  }
}
