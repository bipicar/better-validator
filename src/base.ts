/// <reference types="underscore" />

import * as _ from 'underscore';

export declare type rule = (validator: any) => boolean | Failure[];

export declare type Failure = {
  failed: string,
  path: (string|number)[],
  rule?: rule,
  value: any
};

export class Base {
  path: (string|number)[];
  tests: {name: string, rule: rule}[];

  constructor(path: string | (string|number)[] | null) {
    this.path = !path ? [] : typeof path !== 'string' ? path : [path];
    this.tests = [];
  }

  static hasValue(value: any): boolean {
    return value !== undefined && value !== null;
  }

  display(path: string): this {
    if (path !== null && path !== undefined) {
      this.path.push(path);
    }
    return this;
  }

  required(): this {
    const child = new (<typeof Base>this.constructor)(this.path) as this;
    this.satisfies('required', (value) => Base.hasValue(value) && child.test(value));
    return child;
  }

  isEqual(expected: any): this {
    this.satisfies('isEqual', (value) => value === expected);
    return this;
  }

  notEqual(expected: any): this {
    this.satisfies('notEqual', (value) => value !== expected);
    return this;
  }

  satisfies(name: string, rule: rule): this {
    this.tests.push({name, rule});
    return this;
  }

  check(rule: rule) {
    return rule && rule(this) || this;
  }

  test(value: any): Failure[] {
    const failures: Array<Failure> = [];
    for (const test of this.tests) {
      const results = test.rule(value);

      if (_.isArray(results)) {
        for (const result of results) {
          failures.push(result);
        }
      } else {
        if (results) continue;

        // failed
        failures.push({
          failed: test.name,
          path: this.path,
          rule: test.rule,
          value
        });
      }
    }
    return failures;
  }
}
