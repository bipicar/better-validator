/// <reference path="../typings/underscore/underscore.d.ts" />
import { Base } from "./base";
import { IsAnything } from "./isAnything";
export declare class ValidatorFactory {
    options: any;
    tests: {
        validator: Base;
        value: any;
    }[];
    static __defaultOptions: any;
    constructor(options: any);
    create(value: any): IsAnything;
    createAndRun(value: any, rules: (validator: Base) => void): any[];
    run(): any[];
    static defaultOptions: any;
}
