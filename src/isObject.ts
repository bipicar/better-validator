/// <reference path="../typings/underscore/underscore.d.ts" />

import * as _ from 'underscore';
import {Base} from './base';

export declare type objectValidator = (childValidator) => void;
export declare type baseConstructor = new (path:(string|number)[]) => Base;

export class IsObject extends Base {
  properties:string[];
  objectValidator:objectValidator;
  elementValidator:baseConstructor;
  elementValidatorName:string;

  constructor(path:(string|number)[], objectValidator:objectValidator,
              elementValidator:baseConstructor, elementValidatorName:string) {
    super(path);

    this.objectValidator = objectValidator;
    this.elementValidator = elementValidator;
    this.elementValidatorName = elementValidatorName;
    this.properties = [];

    if (objectValidator) {
      objectValidator(this.childValidator.bind(this));
    }
  }

  childValidator(property):Base {
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

  strict():this {
    this.satisfies('strict', (value) => {
      const properties = Object.keys(value);
      const unexpectedProperties = _.difference(properties, this.properties);
      return _.map(unexpectedProperties, (property) => {
        const path = this.path.slice();
        path.push(property);

        return {
          path,
          failed: 'strict',
          value: value[property]
        };
      })
    });
    return this;
  }
}
