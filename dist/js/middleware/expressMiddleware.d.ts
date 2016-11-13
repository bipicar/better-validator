/// <reference path="../../typings/underscore/underscore.d.ts" />
export declare class ExpressMiddleware {
    options: any;
    constructor(options: any);
    query(rule: any): (req: any, res: any, next: any) => void;
    body(rule: any): (req: any, res: any, next: any) => void;
    checkErrors(validator: any, res: any, next: any): void;
}
