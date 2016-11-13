/// <reference path="../typings/validator/validator.d.ts" />
import { Base } from "./base";
export declare class IsString extends Base {
    constructor(path: (string | number)[]);
    isMatch(regex: RegExp): this;
    notMatch(regex: RegExp): this;
}
