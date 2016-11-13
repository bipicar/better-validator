const v = require('../dist/js/validator');

const OPTIONS_RAW = {};

// describe('constructor', () => {
//   it('must accept options', () => {
//     const options = {
//       foo: 'bar'
//     };
//     const validator = new v.Validator(options);
//     expect(validator.options).toBeDefined();
//     expect(validator.options.foo).toBe('bar');
//   });
//
//   it('must not require options', () => {
//     const validator = new v.Validator();
//     expect(validator.options).toBeDefined();
//   });
//
//   it('must provide default options', () => {
//     const validator = new v.Validator();
//     validator('test').isString();
//   });
// });

describe('basic usage', () => {
  it('chained rules', () => {
    const validator = new v.Validator(OPTIONS_RAW);
    validator('test').display('test1').required().isString().notEmpty().notLowercase().isEmail();
    validator('test').display('test2').required().isString().notEmpty().isLowercase();
    validator(null).display('test3').required().isString().notEmpty();

    const errors = validator.run();

    expect(errors).toBeDefined();
    expect(errors.length).toBe(3);
    expect(errors).toContain(jasmine.objectContaining({path: ['test1'], failed: 'notLowercase'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test1'], failed: 'isEmail'}));
    expect(errors).toContain(jasmine.objectContaining({path: ['test3'], failed: 'required'}));
  });

  it('re-usable rules', () => {
    const validator = new v.Validator(OPTIONS_RAW);
    const rule = (item) => {
      item.required().isString();
    };
    const errors = validator(null, rule);

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], failed: 'required'}));
  });

  it('optional', () => {
    const validator = new v.Validator(OPTIONS_RAW);

    let errors = validator(null, (item) => {
      item.isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);

    errors = validator(null, (item) => {
      item.isString().isEmail();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);

    errors = validator('aslkjdf', (item) => {
      item.isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(0);
  });

  it('required', () => {
    const validator = new v.Validator(OPTIONS_RAW);

    let errors = validator(null, (item) => {
      item.required().isString();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], failed: 'required'}));

    errors = validator(null, (item) => {
      item.isString().required();
    });

    expect(errors).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors).toContain(jasmine.objectContaining({path: [], failed: 'required'}));

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

  it('isEqual', () => {
    const validator = new v.Validator(OPTIONS_RAW);
    const rule = (item) => {
      item.isEqual(17);
    };

    expect(validator(17, rule)).toEqual([]);
    expect(validator(16, rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator(17.0000001, rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator('17', rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator('asdf', rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator(new Date(), rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator(/./, rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator(true, rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
    expect(validator(false, rule)).toContain(jasmine.objectContaining({path: [], failed: 'isEqual'}));
  });

  it('notEqual', () => {
    const validator = new v.Validator(OPTIONS_RAW);
    const rule = (item) => {
      item.notEqual(17);
    };

    expect(validator(17, rule)).toContain(jasmine.objectContaining({path: [], failed: 'notEqual'}));
    expect(validator(16, rule)).toEqual([]);
    expect(validator(17.0000001, rule)).toEqual([]);
    expect(validator('17', rule)).toEqual([]);
    expect(validator('asdf', rule)).toEqual([]);
    expect(validator(new Date(), rule)).toEqual([]);
    expect(validator(/./, rule)).toEqual([]);
    expect(validator(true, rule)).toEqual([]);
    expect(validator(false, rule)).toEqual([]);
  });
});
