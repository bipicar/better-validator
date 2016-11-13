/// <reference path="../typings/underscore/underscore.d.ts" />
"use strict";
const _ = require('underscore');
class Base {
    constructor(path) {
        this.path = !path ? [] : typeof path !== 'string' ? path : [path];
        this.tests = [];
    }
    static hasValue(value) {
        return value !== undefined && value !== null;
    }
    display(path) {
        if (path !== null && path !== undefined) {
            this.path.push(path);
        }
        return this;
    }
    required() {
        const child = new this.constructor(this.path);
        this.satisfies('required', (value) => Base.hasValue(value) && child.test(value));
        return child;
    }
    isEqual(expected) {
        this.satisfies('isEqual', (value) => value === expected);
        return this;
    }
    notEqual(expected) {
        this.satisfies('notEqual', (value) => value !== expected);
        return this;
    }
    satisfies(name, rule) {
        this.tests.push({ name, rule });
        return this;
    }
    check(rule) {
        return rule && rule(this) || this;
    }
    test(value) {
        const failures = [];
        for (const test of this.tests) {
            const results = test.rule(value);
            if (_.isArray(results)) {
                for (const result of results) {
                    failures.push(result);
                }
            }
            else {
                if (results)
                    continue;
                // failed
                failures.push({
                    path: this.path,
                    failed: test.name,
                    rule: test.rule,
                    value
                });
            }
        }
        return failures;
    }
}
exports.Base = Base;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEOztBQUU5RCxNQUFZLENBQUMsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQVVoQztJQUlFLFlBQVksSUFBK0I7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsT0FBTyxJQUFJLEtBQUssUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxPQUFPLFFBQVEsQ0FBQyxLQUFTO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7SUFDL0MsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFXO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPLENBQUMsUUFBWTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBWTtRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBVyxFQUFFLElBQVM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFTO1FBQ2IsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBUztRQUNaLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QixDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFBQyxRQUFRLENBQUM7Z0JBRXRCLFNBQVM7Z0JBQ1QsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsS0FBSztpQkFDTixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztBQUNILENBQUM7QUFwRVksWUFBSSxPQW9FaEIsQ0FBQSIsImZpbGUiOiJiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdW5kZXJzY29yZS91bmRlcnNjb3JlLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSB0eXBlIHJ1bGUgPSAodmFsaWRhdG9yOmFueSkgPT4gYm9vbGVhbiB8IEZhaWx1cmVbXTtcbmV4cG9ydCBkZWNsYXJlIHR5cGUgRmFpbHVyZSA9IHtcbiAgcGF0aDooc3RyaW5nfG51bWJlcilbXSxcbiAgZmFpbGVkOnN0cmluZyxcbiAgcnVsZT86cnVsZSxcbiAgdmFsdWU6YW55XG59O1xuXG5leHBvcnQgY2xhc3MgQmFzZSB7XG4gIHBhdGg6KHN0cmluZ3xudW1iZXIpW107XG4gIHRlc3RzOntuYW1lOnN0cmluZywgcnVsZTpydWxlfVtdO1xuXG4gIGNvbnN0cnVjdG9yKHBhdGg6c3RyaW5nIHwgKHN0cmluZ3xudW1iZXIpW10pIHtcbiAgICB0aGlzLnBhdGggPSAhcGF0aCA/IFtdIDogdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnID8gcGF0aCA6IFtwYXRoXTtcbiAgICB0aGlzLnRlc3RzID0gW107XG4gIH1cblxuICBzdGF0aWMgaGFzVmFsdWUodmFsdWU6YW55KTpib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgfVxuXG4gIGRpc3BsYXkocGF0aDpzdHJpbmcpIHtcbiAgICBpZiAocGF0aCAhPT0gbnVsbCAmJiBwYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucGF0aC5wdXNoKHBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlcXVpcmVkKCk6QmFzZSB7XG4gICAgY29uc3QgY2hpbGQgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnBhdGgpO1xuICAgIHRoaXMuc2F0aXNmaWVzKCdyZXF1aXJlZCcsICh2YWx1ZSkgPT4gQmFzZS5oYXNWYWx1ZSh2YWx1ZSkgJiYgY2hpbGQudGVzdCh2YWx1ZSkpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIGlzRXF1YWwoZXhwZWN0ZWQ6YW55KSB7XG4gICAgdGhpcy5zYXRpc2ZpZXMoJ2lzRXF1YWwnLCAodmFsdWUpID0+IHZhbHVlID09PSBleHBlY3RlZCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBub3RFcXVhbChleHBlY3RlZDphbnkpIHtcbiAgICB0aGlzLnNhdGlzZmllcygnbm90RXF1YWwnLCAodmFsdWUpID0+IHZhbHVlICE9PSBleHBlY3RlZCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzYXRpc2ZpZXMobmFtZTpzdHJpbmcsIHJ1bGU6cnVsZSkge1xuICAgIHRoaXMudGVzdHMucHVzaCh7bmFtZSwgcnVsZX0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2hlY2socnVsZTpydWxlKSB7XG4gICAgcmV0dXJuIHJ1bGUgJiYgcnVsZSh0aGlzKSB8fCB0aGlzO1xuICB9XG5cbiAgdGVzdCh2YWx1ZTphbnkpOkZhaWx1cmVbXSB7XG4gICAgY29uc3QgZmFpbHVyZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHRlc3Qgb2YgdGhpcy50ZXN0cykge1xuICAgICAgY29uc3QgcmVzdWx0cyA9IHRlc3QucnVsZSh2YWx1ZSk7XG5cbiAgICAgIGlmIChfLmlzQXJyYXkocmVzdWx0cykpIHtcbiAgICAgICAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuICAgICAgICAgIGZhaWx1cmVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlc3VsdHMpIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vIGZhaWxlZFxuICAgICAgICBmYWlsdXJlcy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiB0aGlzLnBhdGgsXG4gICAgICAgICAgZmFpbGVkOiB0ZXN0Lm5hbWUsXG4gICAgICAgICAgcnVsZTogdGVzdC5ydWxlLFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFpbHVyZXM7XG4gIH1cbn1cbiJdfQ==
