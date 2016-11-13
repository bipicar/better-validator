/// <reference path="../typings/underscore/underscore.d.ts" />
import { Base } from './base';
export declare type objectValidator = (childValidator) => void;
export declare type baseConstructor = new (path: (string | number)[]) => Base;
export declare class IsObject extends Base {
    properties: string[];
    objectValidator: objectValidator;
    elementValidator: baseConstructor;
    elementValidatorName: string;
    constructor(path: (string | number)[], objectValidator: objectValidator, elementValidator: baseConstructor, elementValidatorName: string);
    childValidator(property: any): Base;
    strict(): this;
}
