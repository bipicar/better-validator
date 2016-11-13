/// <reference path="../../typings/underscore/underscore.d.ts" />
export declare class KoaMiddleware {
    options: any;
    constructor(options: any);
    query(rule: any): (next: any) => IterableIterator<any>;
    body(rule: any): (next: any) => IterableIterator<any>;
    checkErrors(validator: any, ctx: any, next: any): IterableIterator<any>;
}
