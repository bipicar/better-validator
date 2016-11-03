const _ = require('underscore');

const Base = require('./base');

module.exports = class IsObject extends Base {
  constructor(path, objectValidator) {
    super(path);

    this.objectValidator = objectValidator;
    this.properties = [];

    if (objectValidator) {
      objectValidator(this.childValidator.bind(this));
    }
  }

  childValidator(property) {
    if (!property) return this;

    const path = this.path.slice();
    path.push(property);
    this.properties.push(property);

    const IsAnything = require('./isAnything');
    const child = new IsAnything(path);
    this.satisfies('isAnything', (value) => {
      const propertyValue = value && value[property];
      return propertyValue === null || child.test(propertyValue);
    });
    return child;
  }

  strict() {
    this.satisfies('strict', (value) => {
      const properties = Object.keys(value);
      const unexpectedProperties = _.difference(properties, this.properties);
      return _.map(unexpectedProperties, (property) => {
        const path = this.path.slice();
        path.push(property);

        return {
          path,
          test: 'strict',
          value: value[property]
        };
      })
    });
    return this;
  }
};
