/// <reference types="underscore" />

import * as _ from 'underscore';
import {Base} from './Base';

export declare type ObjectValidator = (ChildValidator) => void;
export declare type BaseConstructor = new (path: (string|number)[]) => Base;

export class IsObject extends Base {
  properties: string[];
  objectValidator: ObjectValidator;
  elementValidator: BaseConstructor;
  elementValidatorName: string;

  constructor(path: (string|number)[], objectValidator: ObjectValidator,
              elementValidator: BaseConstructor, elementValidatorName: string) {
    super(path);

    this.objectValidator = objectValidator;
    this.elementValidator = elementValidator;
    this.elementValidatorName = elementValidatorName;
    this.properties = [];

    if (objectValidator) {
      objectValidator(this.childValidator.bind(this));
    }
  }

  childValidator(property): Base {
    if (!property) return this;

    const path = this.path.slice();
    path.push(property);
    this.properties.push(property);

    const child = new this.elementValidator(path);
    this.satisfies(this.elementValidatorName, (value) => {
      const propertyValue = value && value[property];
      return propertyValue === null || child.test(propertyValue);
    });
    return child;
  }

  strict(): this {
    this.satisfies('strict', (value) => {
      const properties = Object.keys(value);
      const unexpectedProperties: Array<string> = _.difference(properties, this.properties);
      return _.map(unexpectedProperties, (property) => {
        const path = this.path.slice();
        path.push(property);

        return {
          path,
          failed: 'strict',
          value: value[property]
        };
      });
    });
    return this;
  }
}
