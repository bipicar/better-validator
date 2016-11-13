import { ExpressMiddleware } from "./middleware/expressMiddleware";
import { KoaMiddleware } from "./middleware/koaMiddleware";
export declare class Validator {
    constructor(options: any);
    static defaultOptions: any;
    static expressMiddleware(options: any): ExpressMiddleware;
    static koaMiddleware(options: any): KoaMiddleware;
}
