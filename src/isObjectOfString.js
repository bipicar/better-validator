const IsObject = require('./isObject');

module.exports = class IsObjectOfString extends IsObject {
  constructor(path, objectValidator) {
    super(path, objectValidator);
  }

  childValidator(property) {
    const path = this.path.slice();
    path.push(property);
    this.properties.push(property);

    const IsString = require('./isString');
    const child = new IsString(path);
    this.satisfies('isString', (value) => {
      const propertyValue = value && value[property];
      return propertyValue === null || child.test(propertyValue);
    });
    return child;
  }
};
