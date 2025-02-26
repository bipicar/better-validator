import * as _ from 'underscore';
import {Base} from '../Base';
import {Helpers} from '../Helpers';
import {IsObject, ObjectValidator, StringObjectValidator} from '../IsObject';
import {IsString} from '../IsString';
import {ValidatorFactory} from '../ValidatorFactory';

export class ExpressMiddleware {
  protected options: any;

  constructor(options) {
    this.options = _.defaults({}, options);
  }

  public query(rule: StringObjectValidator) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(req.query).display('?');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', value => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      this.checkErrors(validator, req, res, next);
    };
  }

  public body(rule: ObjectValidator) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      validator.create(req.body).isObject(rule);
      this.checkErrors(validator, req, res, next);
    };
  }

  public params(rule: StringObjectValidator) {
    return (req, res, next) => {
      const validator = new ValidatorFactory(this.options);
      const anythingValidator = validator.create(req.params).display('@');
      const objectValidator = new IsObject(anythingValidator.path, rule, IsString, 'isString');
      anythingValidator.satisfies('isObjectOfString', value => (!Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
      this.checkErrors(validator, req, res, next);
    };
  }

  public checkErrors(validator, req, res, next) {
    const failures = validator.run();
    if (!failures || !failures.length) {
      next();
      return;
    }

    res.status(400).send(Helpers.format(this.options.responseFormatter,
      _.map(failures, failure => Helpers.format(this.options.translationFormatter, failure, req, res)),
    ));
  }
}
