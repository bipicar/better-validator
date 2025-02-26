"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Base_1 = require("./Base");
class IsObject extends Base_1.Base {
    constructor(path, objectValidator, elementValidator, elementValidatorName) {
        super(path);
        this.objectValidator = objectValidator;
        this.elementValidator = elementValidator;
        this.elementValidatorName = elementValidatorName;
        this.properties = [];
        if (objectValidator) {
            objectValidator(this.childValidator.bind(this));
        }
    }
    strict() {
        this.satisfies('strict', value => {
            const properties = Object.keys(value);
            const unexpectedProperties = _.difference(properties, this.properties);
            return _.map(unexpectedProperties, property => {
                const path = this.path.slice();
                path.push(property);
                return {
                    failed: 'strict',
                    path,
                    value: value[property],
                };
            });
        });
        return this;
    }
    childValidator(property) {
        if (!property)
            return this;
        const path = this.path.slice();
        path.push(property);
        this.properties.push(property);
        const child = new this.elementValidator(path);
        this.satisfies(this.elementValidatorName, value => {
            const propertyValue = value && value[property];
            return child.test(propertyValue);
        });
        return child;
    }
}
exports.IsObject = IsObject;
//# sourceMappingURL=IsObject.js.map