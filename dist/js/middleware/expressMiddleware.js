/// <reference path="../../typings/underscore/underscore.d.ts" />
"use strict";
const _ = require('underscore');
const base_1 = require('../base');
const helpers_1 = require('../helpers');
const validatorFactory_1 = require('../validatorFactory');
const isObject_1 = require('../isObject');
const isString_1 = require('../isString');
class ExpressMiddleware {
    constructor(options) {
        this.options = _.defaults({}, options);
    }
    query(rule) {
        return (req, res, next) => {
            const validator = new validatorFactory_1.ValidatorFactory(this.options);
            const anythingValidator = validator.create(req.query).display('?');
            const objectValidator = new isObject_1.IsObject(anythingValidator.path, rule, isString_1.IsString, 'isString');
            anythingValidator.satisfies('isObjectOfString', (value) => (!base_1.Base.hasValue(value) || _.isObject(value)) && objectValidator.test(value));
            this.checkErrors(validator, res, next);
        };
    }
    body(rule) {
        return (req, res, next) => {
            const validator = new validatorFactory_1.ValidatorFactory(this.options);
            validator.create(req.body).isObject(rule);
            this.checkErrors(validator, res, next);
        };
    }
    checkErrors(validator, res, next) {
        const failures = validator.run();
        if (!failures || !failures.length) {
            next();
            return;
        }
        res.status(400).send(helpers_1.Helpers.format(this.options.responseFormatter, failures));
    }
}
exports.ExpressMiddleware = ExpressMiddleware;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmUvZXhwcmVzc01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUVBQWlFOztBQUVqRSxNQUFZLENBQUMsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUNoQyx1QkFBbUIsU0FBUyxDQUFDLENBQUE7QUFDN0IsMEJBQXNCLFlBQVksQ0FBQyxDQUFBO0FBQ25DLG1DQUErQixxQkFBcUIsQ0FBQyxDQUFBO0FBQ3JELDJCQUF1QixhQUFhLENBQUMsQ0FBQTtBQUNyQywyQkFBdUIsYUFBYSxDQUFDLENBQUE7QUFFckM7SUFHRSxZQUFZLE9BQU87UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckQsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkUsTUFBTSxlQUFlLEdBQUcsSUFBSSxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsbUJBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN6RixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4SSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ1AsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksbUNBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDOUIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDSCxDQUFDO0FBbENZLHlCQUFpQixvQkFrQzdCLENBQUEiLCJmaWxlIjoibWlkZGxld2FyZS9leHByZXNzTWlkZGxld2FyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL3VuZGVyc2NvcmUvdW5kZXJzY29yZS5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQge0hlbHBlcnN9IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IHtWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuLi92YWxpZGF0b3JGYWN0b3J5JztcbmltcG9ydCB7SXNPYmplY3R9IGZyb20gJy4uL2lzT2JqZWN0JztcbmltcG9ydCB7SXNTdHJpbmd9IGZyb20gJy4uL2lzU3RyaW5nJztcblxuZXhwb3J0IGNsYXNzIEV4cHJlc3NNaWRkbGV3YXJlIHtcbiAgb3B0aW9uczphbnk7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IF8uZGVmYXVsdHMoe30sIG9wdGlvbnMpO1xuICB9XG5cbiAgcXVlcnkocnVsZSkge1xuICAgIHJldHVybiAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3JGYWN0b3J5KHRoaXMub3B0aW9ucyk7XG4gICAgICBjb25zdCBhbnl0aGluZ1ZhbGlkYXRvciA9IHZhbGlkYXRvci5jcmVhdGUocmVxLnF1ZXJ5KS5kaXNwbGF5KCc/Jyk7XG4gICAgICBjb25zdCBvYmplY3RWYWxpZGF0b3IgPSBuZXcgSXNPYmplY3QoYW55dGhpbmdWYWxpZGF0b3IucGF0aCwgcnVsZSwgSXNTdHJpbmcsICdpc1N0cmluZycpO1xuICAgICAgYW55dGhpbmdWYWxpZGF0b3Iuc2F0aXNmaWVzKCdpc09iamVjdE9mU3RyaW5nJywgKHZhbHVlKSA9PiAoIUJhc2UuaGFzVmFsdWUodmFsdWUpIHx8IF8uaXNPYmplY3QodmFsdWUpKSAmJiBvYmplY3RWYWxpZGF0b3IudGVzdCh2YWx1ZSkpO1xuICAgICAgdGhpcy5jaGVja0Vycm9ycyh2YWxpZGF0b3IsIHJlcywgbmV4dCk7XG4gICAgfVxuICB9XG5cbiAgYm9keShydWxlKSB7XG4gICAgcmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvckZhY3RvcnkodGhpcy5vcHRpb25zKTtcbiAgICAgIHZhbGlkYXRvci5jcmVhdGUocmVxLmJvZHkpLmlzT2JqZWN0KHJ1bGUpO1xuICAgICAgdGhpcy5jaGVja0Vycm9ycyh2YWxpZGF0b3IsIHJlcywgbmV4dCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tFcnJvcnModmFsaWRhdG9yLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCBmYWlsdXJlcyA9IHZhbGlkYXRvci5ydW4oKTtcbiAgICBpZiAoIWZhaWx1cmVzIHx8ICFmYWlsdXJlcy5sZW5ndGgpIHtcbiAgICAgIG5leHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDQwMCkuc2VuZChIZWxwZXJzLmZvcm1hdCh0aGlzLm9wdGlvbnMucmVzcG9uc2VGb3JtYXR0ZXIsIGZhaWx1cmVzKSk7XG4gIH1cbn1cbiJdfQ==
