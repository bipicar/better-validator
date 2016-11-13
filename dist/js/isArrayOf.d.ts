/// <reference path="../typings/underscore/underscore.d.ts" />
import { Base } from "./base";
export declare type objectValidator = (childValidator) => void;
export declare type itemValidatorFactory = (path: (string | number)[]) => Base;
export declare class IsArrayOf extends Base {
    itemValidatorFactory: itemValidatorFactory;
    itemValidatorName: string;
    constructor(path: (string | number)[], itemValidatorFactory: itemValidatorFactory, itemValidatorName: string);
    validateArray(): void;
    length(expected: number): this;
    lengthInRange(lower: number, upper: number): this;
}
