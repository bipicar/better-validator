/// <reference path="../typings/underscore/underscore.d.ts" />
"use strict";
const _ = require("underscore");
const helpers_1 = require("./helpers");
const isAnything_1 = require("./isAnything");
const DEFAULT_OPTIONS = {
    failureFormatter: null,
    responseFormatter: null
};
class ValidatorFactory {
    constructor(options) {
        this.options = _.defaults({}, options, ValidatorFactory.defaultOptions, DEFAULT_OPTIONS);
        this.tests = [];
        // const factory = (value, rules) => {
        //   const test = {
        //     validator: new IsAnything(null),
        //     value
        //   };
        //
        //   if (rules && _.isFunction(rules)) {
        //     rules(test.validator);
        //     return test.validator.test(test.value);
        //   }
        //
        //   this.tests.push(test);
        //   return test.validator;
        // };
        // factory.run = this.run.bind(this);
        // return factory;
    }
    create(value) {
        const test = {
            validator: new isAnything_1.IsAnything(null),
            value
        };
        this.tests.push(test);
        return test.validator;
    }
    createAndRun(value, rules) {
        const test = {
            validator: new isAnything_1.IsAnything(null),
            value
        };
        rules(test.validator);
        return test.validator.test(test.value);
    }
    run() {
        const failures = _.flatten(_.map(this.tests, (test) => test.validator.test(test.value)));
        const formatter = this.options.failureFormatter;
        if (!formatter) {
            return failures;
        }
        return _.map(failures, (failure) => {
            return helpers_1.Helpers.format(formatter, failure);
        });
    }
    static get defaultOptions() {
        return ValidatorFactory.__defaultOptions;
    }
    static set defaultOptions(value) {
        ValidatorFactory.__defaultOptions = value;
    }
}
exports.ValidatorFactory = ValidatorFactory;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRvckZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEOztBQUU5RCxNQUFZLENBQUMsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUVoQywwQkFBc0IsV0FBVyxDQUFDLENBQUE7QUFDbEMsNkJBQXlCLGNBQWMsQ0FBQyxDQUFBO0FBRXhDLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsaUJBQWlCLEVBQUUsSUFBSTtDQUN4QixDQUFDO0FBRUY7SUFLRSxZQUFZLE9BQU87UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHNDQUFzQztRQUN0QyxtQkFBbUI7UUFDbkIsdUNBQXVDO1FBQ3ZDLFlBQVk7UUFDWixPQUFPO1FBQ1AsRUFBRTtRQUNGLHdDQUF3QztRQUN4Qyw2QkFBNkI7UUFDN0IsOENBQThDO1FBQzlDLE1BQU07UUFDTixFQUFFO1FBQ0YsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQixLQUFLO1FBQ0wscUNBQXFDO1FBQ3JDLGtCQUFrQjtJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVM7UUFDZCxNQUFNLElBQUksR0FBRztZQUNYLFNBQVMsRUFBRSxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDO1lBQy9CLEtBQUs7U0FDTixDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFTLEVBQUUsS0FBOEI7UUFDcEQsTUFBTSxJQUFJLEdBQUc7WUFDWCxTQUFTLEVBQUUsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQztZQUMvQixLQUFLO1NBQ04sQ0FBQztRQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsR0FBRztRQUNELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPO1lBQzdCLE1BQU0sQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVyxjQUFjO1FBQ3ZCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVyxjQUFjLENBQUMsS0FBSztRQUM3QixnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDNUMsQ0FBQztBQUNILENBQUM7QUFsRVksd0JBQWdCLG1CQWtFNUIsQ0FBQSIsImZpbGUiOiJ2YWxpZGF0b3JGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdW5kZXJzY29yZS91bmRlcnNjb3JlLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XG5pbXBvcnQge0Jhc2V9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7SGVscGVyc30gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHtJc0FueXRoaW5nfSBmcm9tIFwiLi9pc0FueXRoaW5nXCI7XG5cbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgZmFpbHVyZUZvcm1hdHRlcjogbnVsbCxcbiAgcmVzcG9uc2VGb3JtYXR0ZXI6IG51bGxcbn07XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JGYWN0b3J5IHtcbiAgb3B0aW9uczphbnk7XG4gIHRlc3RzOnt2YWxpZGF0b3I6QmFzZSwgdmFsdWU6YW55fVtdO1xuICBzdGF0aWMgX19kZWZhdWx0T3B0aW9uczphbnk7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IF8uZGVmYXVsdHMoe30sIG9wdGlvbnMsIFZhbGlkYXRvckZhY3RvcnkuZGVmYXVsdE9wdGlvbnMsIERFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy50ZXN0cyA9IFtdO1xuICAgIC8vIGNvbnN0IGZhY3RvcnkgPSAodmFsdWUsIHJ1bGVzKSA9PiB7XG4gICAgLy8gICBjb25zdCB0ZXN0ID0ge1xuICAgIC8vICAgICB2YWxpZGF0b3I6IG5ldyBJc0FueXRoaW5nKG51bGwpLFxuICAgIC8vICAgICB2YWx1ZVxuICAgIC8vICAgfTtcbiAgICAvL1xuICAgIC8vICAgaWYgKHJ1bGVzICYmIF8uaXNGdW5jdGlvbihydWxlcykpIHtcbiAgICAvLyAgICAgcnVsZXModGVzdC52YWxpZGF0b3IpO1xuICAgIC8vICAgICByZXR1cm4gdGVzdC52YWxpZGF0b3IudGVzdCh0ZXN0LnZhbHVlKTtcbiAgICAvLyAgIH1cbiAgICAvL1xuICAgIC8vICAgdGhpcy50ZXN0cy5wdXNoKHRlc3QpO1xuICAgIC8vICAgcmV0dXJuIHRlc3QudmFsaWRhdG9yO1xuICAgIC8vIH07XG4gICAgLy8gZmFjdG9yeS5ydW4gPSB0aGlzLnJ1bi5iaW5kKHRoaXMpO1xuICAgIC8vIHJldHVybiBmYWN0b3J5O1xuICB9XG5cbiAgY3JlYXRlKHZhbHVlOmFueSk6SXNBbnl0aGluZyB7XG4gICAgY29uc3QgdGVzdCA9IHtcbiAgICAgIHZhbGlkYXRvcjogbmV3IElzQW55dGhpbmcobnVsbCksXG4gICAgICB2YWx1ZVxuICAgIH07XG5cbiAgICB0aGlzLnRlc3RzLnB1c2godGVzdCk7XG4gICAgcmV0dXJuIHRlc3QudmFsaWRhdG9yO1xuICB9XG5cbiAgY3JlYXRlQW5kUnVuKHZhbHVlOmFueSwgcnVsZXM6KHZhbGlkYXRvcjpCYXNlKSA9PiB2b2lkKTphbnlbXSB7IC8vIFRPRE8gdHlwZVxuICAgIGNvbnN0IHRlc3QgPSB7XG4gICAgICB2YWxpZGF0b3I6IG5ldyBJc0FueXRoaW5nKG51bGwpLFxuICAgICAgdmFsdWVcbiAgICB9O1xuXG4gICAgcnVsZXModGVzdC52YWxpZGF0b3IpO1xuICAgIHJldHVybiB0ZXN0LnZhbGlkYXRvci50ZXN0KHRlc3QudmFsdWUpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IGZhaWx1cmVzID0gXy5mbGF0dGVuKF8ubWFwKHRoaXMudGVzdHMsICh0ZXN0KSA9PiB0ZXN0LnZhbGlkYXRvci50ZXN0KHRlc3QudmFsdWUpKSk7XG5cbiAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLm9wdGlvbnMuZmFpbHVyZUZvcm1hdHRlcjtcbiAgICBpZiAoIWZvcm1hdHRlcikge1xuICAgICAgcmV0dXJuIGZhaWx1cmVzO1xuICAgIH1cblxuICAgIHJldHVybiBfLm1hcChmYWlsdXJlcywgKGZhaWx1cmUpID0+IHtcbiAgICAgIHJldHVybiBIZWxwZXJzLmZvcm1hdChmb3JtYXR0ZXIsIGZhaWx1cmUpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gVmFsaWRhdG9yRmFjdG9yeS5fX2RlZmF1bHRPcHRpb25zO1xuICB9XG5cbiAgc3RhdGljIHNldCBkZWZhdWx0T3B0aW9ucyh2YWx1ZSkge1xuICAgIFZhbGlkYXRvckZhY3RvcnkuX19kZWZhdWx0T3B0aW9ucyA9IHZhbHVlO1xuICB9XG59XG4iXX0=
