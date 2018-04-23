import * as _ from 'underscore';

export interface IFailure {
  failed: string;
  path: (string | number)[];
  rule?: Rule;
  value: any;
}

export declare type Rule = (validator: any) => boolean | IFailure[];

export class Base {
  public static hasValue(value: any, allowNull?: boolean): boolean {
    return (!allowNull) ? (value !== undefined && value !== null) : value !== undefined;
  }

  public path: (string | number)[];
  protected tests: {name: string, rule: Rule}[];

  constructor(path: string | (string | number)[] | null) {
    this.path = !path ? [] : typeof path !== 'string' ? path : [path];
    this.tests = [];
  }

  public display(path: string): this {
    if (path !== null && path !== undefined) {
      this.path.push(path);
    }
    return this;
  }

  public required(): this {
    const child = new (<typeof Base>this.constructor)(this.path) as this;
    this.satisfies('required', value => Base.hasValue(value, false) && child.test(value));
    return child;
  }

  public requiredWithNull(): this {
    const child = new (<typeof Base>this.constructor)(this.path) as this;
    this.satisfies('requiredWithNull', value => Base.hasValue(value, true) && child.test(value));
    return child;
  }

  public isIncludedInArray(array:Array<any> = []): this {
    this.satisfies('isIncludedInArray', (value) => _.contains(array, value));
    return this;
  }

  public isEqual(expected: any): this {
    this.satisfies('isEqual', value => value === expected);
    return this;
  }

  public notEqual(expected: any): this {
    this.satisfies('notEqual', value => value !== expected);
    return this;
  }

  public if(predicate: (item: any) => boolean, validator: (validator: this) => void) {
    this.satisfies('if', value => {
      const passed = predicate(value);
      if (!passed) return [];
      const child = new (<typeof Base>this.constructor)(this.path) as this;
      validator(child);
      return child.test(value);
    });
    return this;
  }

  public satisfies(name: string, rule: Rule): this {
    this.tests.push({name, rule});
    return this;
  }

  public check(rule: Rule) {
    return rule && rule(this) || this;
  }

  public test(value: any): IFailure[] {
    const failures: IFailure[] = [];
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
          value,
        });
      }
    }
    return failures;
  }
}
