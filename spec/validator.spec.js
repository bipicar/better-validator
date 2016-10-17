const Validator = require('../src/validator');

const OPTIONS_RAW = {};

// describe('constructor', () => {
//   it('must accept options', () => {
//     const options = {
//       foo: 'bar'
//     };
//     const validator = new Validator(options);
//     expect(validator.options).toBeDefined();
//     expect(validator.options.foo).toBe('bar');
//   });
//
//   it('must not require options', () => {
//     const validator = new Validator();
//     expect(validator.options).toBeDefined();
//   });
//
//   it('must provide default options', () => {
//     const validator = new Validator();
//     validator('test').isString();
//   });
// });

describe('basic usage', () => {
  it('chained rules', () => {
    const validator = new Validator(OPTIONS_RAW);
    validator('test').display('test1').required().isString().notEmpty().notLowercase().isEmail();
    validator('test').display('test2').required().isString().notEmpty().isLowercase();
    validator(null).display('test3').required().isString().notEmpty();

    const errors = validator.run();

    expect(errors).toBeDefined();
    expect(errors.length).toBe(3);
    expect(errors).toContain(jasmine.objectContaining({path: ['test1'], test: 'notLowercase'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test1'], test: 'isEmail'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test3'], test: 'required'}));
  });

  it('re-usable rules', () => {
    const validator = new Validator(OPTIONS_RAW);
    const rule = (item) => {
      item.required().isString();
    };
    const errors = validator(null, rule);

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], test: 'required'}));
  });

  it('optional', () => {
    const validator = new Validator(OPTIONS_RAW);

    let errors = validator(null, (item) => {
      item.isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);

    errors = validator(null, (item) => {
      item.isString().isEmail();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], test: 'isEmail'}));

    errors = validator('aslkjdf', (item) => {
      item.isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);
  });

  it('required', () => {
    const validator = new Validator(OPTIONS_RAW);

    let errors = validator(null, (item) => {
      item.required().isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], test: 'required'}));

    errors = validator(null, (item) => {
      item.isString().required();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], test: 'required'}));

    errors = validator('aslkjdf', (item) => {
      item.required().isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);

    errors = validator('aslkjdf', (item) => {
      item.isString().required();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);
  });
});
