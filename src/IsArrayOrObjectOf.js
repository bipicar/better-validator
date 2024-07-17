"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Base_1 = require("./Base");
class IsArrayOrObjectOf extends Base_1.Base {
    constructor(path, itemValidatorFactory, itemValidatorName) {
        super(path);
        this.itemValidatorFactory = itemValidatorFactory;
        this.itemValidatorName = itemValidatorName;
        this.validateArrayOrObject();
    }
    length(expected) {
        this.satisfies('length', value => !Base_1.Base.hasValue(value) || value.length === expected);
        return this;
    }
    lengthInRange(lower, upper) {
        this.satisfies('lengthInRange', value => !Base_1.Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
        return this;
    }
    validateArrayOrObject() {
        this.satisfies('isArrayOrObject', value => {
            if (value === null || value === undefined)
                return true;
            if (!_.isArray(value)) {
                value = [value];
            }
            let failures = [];
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                const path = this.path.slice();
                path.push(i);
                const child = this.itemValidatorFactory(path);
                if (Base_1.Base.hasValue(item)) {
                    failures = failures.concat(child.test(item));
                }
            }
            return failures;
        });
    }
}
exports.IsArrayOrObjectOf = IsArrayOrObjectOf;
//# sourceMappingURL=IsArrayOrObjectOf.js.map