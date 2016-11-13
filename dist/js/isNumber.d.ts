import { Base } from './base';
export declare class IsNumber extends Base {
    constructor(path: (string | number)[]);
    integer(): this;
    isInRange(lower: number, upper: number): this;
    notInRange(lower: number, upper: number): this;
    gt(threshold: number): this;
    gte(threshold: number): this;
    lt(threshold: number): this;
    lte(threshold: number): this;
    isPositive(): this;
    notPositive(): this;
    isNegative(): this;
    notNegative(): this;
    isZero(): this;
    notZero(): this;
}
