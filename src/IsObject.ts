import * as _ from 'underscore';
import {Base} from './Base';
import {IsAnything} from './IsAnything';
import {IsString} from './IsString';

export declare type ObjectValidator = (validator: ChildValidator | StringChildValidator) => void;
export declare type ChildValidator = ((property: string) => IsAnything) & (() => IsObject);
export declare type StringObjectValidator = (validator: StringChildValidator) => void;
export declare type StringChildValidator = ((property: string) => IsString) & (() => IsObject);
export declare type BaseConstructor = new (path: (string | number)[]) => Base;

export class IsObject extends Base {
  protected properties: string[];
  protected objectValidator: ObjectValidator;
  protected elementValidator: BaseConstructor;
  protected elementValidatorName: string;

  constructor(path: (string | number)[], objectValidator: ObjectValidator, elementValidator: BaseConstructor, elementValidatorName: string) {
    super(path);

    this.objectValidator = objectValidator;
    this.elementValidator = elementValidator;
    this.elementValidatorName = elementValidatorName;
    this.properties = [];

    if (objectValidator) {
      objectValidator(this.childValidator.bind(this));
    }
  }

  public strict(): this {
    this.satisfies('strict', value => {
      const properties = Object.keys(value);
      const unexpectedProperties: string[] = _.difference(properties, this.properties);
      return _.map(unexpectedProperties, property => {
        const path = this.path.slice();
        path.push(property);

        return {
          failed: 'strict',
          path,
          value: value[property],
        };
      });
    });
    return this;
  }

  protected childValidator(property): Base {
    if (!property) return this;

    const path = this.path.slice();
    path.push(property);
    this.properties.push(property);

    const child = new this.elementValidator(path);
    this.satisfies(this.elementValidatorName, value => {
      const propertyValue = value && value[property];
      return propertyValue === null || child.test(propertyValue);
    });
    return child;
  }
}
