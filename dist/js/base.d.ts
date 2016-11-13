/// <reference path="../typings/underscore/underscore.d.ts" />
export declare type rule = (validator: any) => boolean | Failure[];
export declare type Failure = {
    path: (string | number)[];
    failed: string;
    rule?: rule;
    value: any;
};
export declare class Base {
    path: (string | number)[];
    tests: {
        name: string;
        rule: rule;
    }[];
    constructor(path: string | (string | number)[]);
    static hasValue(value: any): boolean;
    display(path: string): this;
    required(): Base;
    isEqual(expected: any): this;
    notEqual(expected: any): this;
    satisfies(name: string, rule: rule): this;
    check(rule: rule): true | this | Failure[];
    test(value: any): Failure[];
}
