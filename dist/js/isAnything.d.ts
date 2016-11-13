/// <reference path="../typings/underscore/underscore.d.ts" />
import { Base } from './base';
import { IsNumber } from './isNumber';
import { IsString } from './isString';
import { IsObject } from './isObject';
import { IsArrayOf } from './isArrayOf';
export declare class IsAnything extends Base {
    constructor(path: (string | number)[]);
    isNumber(): IsNumber;
    isString(): IsString;
    isObject(objectValidator: any): IsObject;
    isArrayOf(childValidator: any): IsArrayOf;
}
