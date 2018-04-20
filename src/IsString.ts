import * as validator from 'validator';
import {Base} from './Base';

export class IsString extends Base {
  constructor(path: (string | number)[]) {
    super(path);

    for (const key of Object.keys(validator)) {
      if (!/^is/.test(key)) continue;
      const fn = validator[key];
      if (typeof fn !== 'function') continue;

      this[key] = (...args) => {
        this.satisfies(key, value => !Base.hasValue(value) || fn.call(validator, value, ...args));
        return this;
      };

      const notKey = `not${key.slice(2)}`;
      this[notKey] = (...args) => {
        this.satisfies(notKey, value => !Base.hasValue(value) || !fn.call(validator, value, ...args));
        return this;
      };
    }
  }

  // isAfter(date?)
  public isAfter(date?): this {
    this.satisfies('isAfter', value => !Base.hasValue(value) || validator.isAfter(value, date));
    return this;
  }

  public notAfter(date?): this {
    this.satisfies('notAfter', value => !Base.hasValue(value) || !validator.isAfter(value, date));
    return this;
  }

  // isAlpha(locale?)
  public isAlpha(locale?): this {
    this.satisfies('isAlpha', value => !Base.hasValue(value) || validator.isAlpha(value, locale));
    return this;
  }

  public notAlpha(locale?): this {
    this.satisfies('notAlpha', value => !Base.hasValue(value) || !validator.isAlpha(value, locale));
    return this;
  }

  // isAlphanumeric(locale?)
  public isAlphanumeric(locale?): this {
    this.satisfies('isAlphanumeric', value => !Base.hasValue(value) || validator.isAlphanumeric(value, locale));
    return this;
  }

  public notAlphanumeric(locale?): this {
    this.satisfies('notAlphanumeric', value => !Base.hasValue(value) || !validator.isAlphanumeric(value, locale));
    return this;
  }

  // isAscii
  public isAscii(): this {
    this.satisfies('isAscii', value => !Base.hasValue(value) || validator.isAscii(value));
    return this;
  }

  public notAscii(): this {
    this.satisfies('notAscii', value => !Base.hasValue(value) || !validator.isAscii(value));
    return this;
  }

  // isBefore(date?)
  public isBefore(date?): this {
    this.satisfies('isBefore', value => !Base.hasValue(value) || validator.isBefore(value, date));
    return this;
  }

  public notBefore(date?): this {
    this.satisfies('notBefore', value => !Base.hasValue(value) || !validator.isBefore(value, date));
    return this;
  }

  // isBoolean
  public isBoolean(): this {
    this.satisfies('isBoolean', value => !Base.hasValue(value) || validator.isBoolean(value));
    return this;
  }

  public notBoolean(): this {
    this.satisfies('notBoolean', value => !Base.hasValue(value) || !validator.isBoolean(value));
    return this;
  }

  // isByteLength(options)
  public isByteLength(options): this {
    this.satisfies('isByteLength', value => !Base.hasValue(value) || validator.isByteLength(value, options));
    return this;
  }

  public notByteLength(options): this {
    this.satisfies('notByteLength', value => !Base.hasValue(value) || !validator.isByteLength(value, options));
    return this;
  }

  // isCreditCard
  public isCreditCard(): this {
    this.satisfies('isCreditCard', value => !Base.hasValue(value) || validator.isCreditCard(value));
    return this;
  }

  public notCreditCard(): this {
    this.satisfies('notCreditCard', value => !Base.hasValue(value) || !validator.isCreditCard(value));
    return this;
  }

  // isCurrency(options)
  public isCurrency(options): this {
    this.satisfies('isCurrency', value => !Base.hasValue(value) || validator.isCurrency(value, options));
    return this;
  }

  public notCurrency(options): this {
    this.satisfies('notCurrency', value => !Base.hasValue(value) || !validator.isCurrency(value, options));
    return this;
  }

  // isDataURI
  public isDataURI(): this {
    this.satisfies('isDataURI', value => !Base.hasValue(value) || validator.isDataURI(value));
    return this;
  }

  public notDataURI(): this {
    this.satisfies('notDataURI', value => !Base.hasValue(value) || !validator.isDataURI(value));
    return this;
  }

  // isDate
  public isDate(): this {
    this.satisfies('isDate', value => !Base.hasValue(value) || validator.isDate(value));
    return this;
  }

  public notDate(): this {
    this.satisfies('notDate', value => !Base.hasValue(value) || !validator.isDate(value));
    return this;
  }

  // isDecimal
  public isDecimal(): this {
    this.satisfies('isDecimal', value => !Base.hasValue(value) || validator.isDecimal(value));
    return this;
  }

  public notDecimal(): this {
    this.satisfies('notDecimal', value => !Base.hasValue(value) || !validator.isDecimal(value));
    return this;
  }

  // isDivisibleBy(number)
  public isDivisibleBy(num): this {
    this.satisfies('isDivisibleBy', value => !Base.hasValue(value) || validator.isDivisibleBy(value, num));
    return this;
  }

  public notDivisibleBy(num): this {
    this.satisfies('notDivisibleBy', value => !Base.hasValue(value) || !validator.isDivisibleBy(value, num));
    return this;
  }

  // isEmail(options?)
  public isEmail(options?): this {
    this.satisfies('isEmail', value => !Base.hasValue(value) || validator.isEmail(value, options));
    return this;
  }

  public notEmail(options?): this {
    this.satisfies('notEmail', value => !Base.hasValue(value) || !validator.isEmail(value, options));
    return this;
  }

  // isEmpty
  public isEmpty(): this {
    this.satisfies('isEmpty', value => !Base.hasValue(value) || validator.isEmpty(value));
    return this;
  }

  public notEmpty(): this {
    this.satisfies('notEmpty', value => !Base.hasValue(value) || !validator.isEmpty(value));
    return this;
  }

  // isFQDN(options?)
  public isFQDN(options?): this {
    this.satisfies('isFQDN', value => !Base.hasValue(value) || validator.isFQDN(value, options));
    return this;
  }

  public notFQDN(options?): this {
    this.satisfies('notFQDN', value => !Base.hasValue(value) || !validator.isFQDN(value, options));
    return this;
  }

  // isFloat(options?)
  public isFloat(options?): this {
    this.satisfies('isFloat', value => !Base.hasValue(value) || validator.isFloat(value, options));
    return this;
  }

  public notFloat(options?): this {
    this.satisfies('notFloat', value => !Base.hasValue(value) || !validator.isFloat(value, options));
    return this;
  }

  // isFullWidth
  public isFullWidth(): this {
    this.satisfies('isFullWidth', value => !Base.hasValue(value) || validator.isFullWidth(value));
    return this;
  }

  public notFullWidth(): this {
    this.satisfies('notFullWidth', value => !Base.hasValue(value) || !validator.isFullWidth(value));
    return this;
  }

  // isHalfWidth
  public isHalfWidth(): this {
    this.satisfies('isHalfWidth', value => !Base.hasValue(value) || validator.isHalfWidth(value));
    return this;
  }

  public notHalfWidth(): this {
    this.satisfies('notHalfWidth', value => !Base.hasValue(value) || !validator.isHalfWidth(value));
    return this;
  }

  // isHexColor
  public isHexColor(): this {
    this.satisfies('isHexColor', value => !Base.hasValue(value) || validator.isHexColor(value));
    return this;
  }

  public notHexColor(): this {
    this.satisfies('notHexColor', value => !Base.hasValue(value) || !validator.isHexColor(value));
    return this;
  }

  // isHexadecimal
  public isHexadecimal(): this {
    this.satisfies('isHexadecimal', value => !Base.hasValue(value) || validator.isHexadecimal(value));
    return this;
  }

  public notHexadecimal(): this {
    this.satisfies('notHexadecimal', value => !Base.hasValue(value) || !validator.isHexadecimal(value));
    return this;
  }

  // isIP(version?)
  public isIP(version?): this {
    this.satisfies('isIP', value => !Base.hasValue(value) || validator.isIP(value, version));
    return this;
  }

  public notIP(version?): this {
    this.satisfies('notIP', value => !Base.hasValue(value) || !validator.isIP(value, version));
    return this;
  }

  // isISBN(version?)
  public isISBN(version?): this {
    this.satisfies('isISBN', value => !Base.hasValue(value) || validator.isISBN(value, version));
    return this;
  }

  public notISBN(version?): this {
    this.satisfies('notISBN', value => !Base.hasValue(value) || !validator.isISBN(value, version));
    return this;
  }

  // isISIN
  public isISIN(): this {
    this.satisfies('isISIN', value => !Base.hasValue(value) || validator.isISIN(value));
    return this;
  }

  public notISIN(): this {
    this.satisfies('notISIN', value => !Base.hasValue(value) || !validator.isISIN(value));
    return this;
  }

  // isISO8601
  public isISO8601(): this {
    this.satisfies('isISO8601', value => !Base.hasValue(value) || validator.isISO8601(value));
    return this;
  }

  public notISO8601(): this {
    this.satisfies('notISO8601', value => !Base.hasValue(value) || !validator.isISO8601(value));
    return this;
  }

  // isIn(values)
  public isIn(values): this {
    this.satisfies('isIn', value => !Base.hasValue(value) || validator.isIn(value, values));
    return this;
  }

  public notIn(values): this {
    this.satisfies('notIn', value => !Base.hasValue(value) || !validator.isIn(value, values));
    return this;
  }

  // isInt(options?)
  public isInt(options?): this {
    this.satisfies('isInt', value => !Base.hasValue(value) || validator.isInt(value, options));
    return this;
  }

  public notInt(options?): this {
    this.satisfies('notInt', value => !Base.hasValue(value) || !validator.isInt(value, options));
    return this;
  }

  // isJSON
  public isJSON(): this {
    this.satisfies('isJSON', value => !Base.hasValue(value) || validator.isJSON(value));
    return this;
  }

  public notJSON(): this {
    this.satisfies('notJSON', value => !Base.hasValue(value) || !validator.isJSON(value));
    return this;
  }

  // isLength(options)
  public isLength(options): this {
    this.satisfies('isLength', value => !Base.hasValue(value) || validator.isLength(value, options));
    return this;
  }

  public notLength(options): this {
    this.satisfies('notLength', value => !Base.hasValue(value) || !validator.isLength(value, options));
    return this;
  }

  // isLowercase
  public isLowercase(): this {
    this.satisfies('isLowercase', value => !Base.hasValue(value) || validator.isLowercase(value));
    return this;
  }

  public notLowercase(): this {
    this.satisfies('notLowercase', value => !Base.hasValue(value) || !validator.isLowercase(value));
    return this;
  }

  // isMACAddress
  public isMACAddress(): this {
    this.satisfies('isMACAddress', value => !Base.hasValue(value) || validator.isMACAddress(value));
    return this;
  }

  public notMACAddress(): this {
    this.satisfies('notMACAddress', value => !Base.hasValue(value) || !validator.isMACAddress(value));
    return this;
  }

  // isMD5
  public isMD5(): this {
    this.satisfies('isMD5', value => !Base.hasValue(value) || validator.isMD5(value));
    return this;
  }

  public notMD5(): this {
    this.satisfies('notMD5', value => !Base.hasValue(value) || !validator.isMD5(value));
    return this;
  }

  // isMobilePhone(locale)
  public isMobilePhone(locale): this {
    this.satisfies('isMobilePhone', value => !Base.hasValue(value) || validator.isMobilePhone(value, locale));
    return this;
  }

  public notMobilePhone(locale): this {
    this.satisfies('notMobilePhone', value => !Base.hasValue(value) || !validator.isMobilePhone(value, locale));
    return this;
  }

  // isMongoId
  public isMongoId(): this {
    this.satisfies('isMongoId', value => !Base.hasValue(value) || validator.isMongoId(value));
    return this;
  }

  public notMongoId(): this {
    this.satisfies('notMongoId', value => !Base.hasValue(value) || !validator.isMongoId(value));
    return this;
  }

  // isMultibyte
  public isMultibyte(): this {
    this.satisfies('isMultibyte', value => !Base.hasValue(value) || validator.isMultibyte(value));
    return this;
  }

  public notMultibyte(): this {
    this.satisfies('notMultibyte', value => !Base.hasValue(value) || !validator.isMultibyte(value));
    return this;
  }

  // isNumeric
  public isNumeric(): this {
    this.satisfies('isNumeric', value => !Base.hasValue(value) || validator.isNumeric(value));
    return this;
  }

  public notNumeric(): this {
    this.satisfies('notNumeric', value => !Base.hasValue(value) || !validator.isNumeric(value));
    return this;
  }

  // isSurrogatePair
  public isSurrogatePair(): this {
    this.satisfies('isSurrogatePair', value => !Base.hasValue(value) || validator.isSurrogatePair(value));
    return this;
  }

  public notSurrogatePair(): this {
    this.satisfies('notSurrogatePair', value => !Base.hasValue(value) || !validator.isSurrogatePair(value));
    return this;
  }

  // isURL(options?)
  public isURL(options?): this {
    this.satisfies('isURL', value => !Base.hasValue(value) || validator.isURL(value, options));
    return this;
  }

  public notURL(options?): this {
    this.satisfies('notURL', value => !Base.hasValue(value) || !validator.isURL(value, options));
    return this;
  }

  // isUUID(version?)
  public isUUID(version?): this {
    this.satisfies('isUUID', value => !Base.hasValue(value) || validator.isUUID(value, version));
    return this;
  }

  public notUUID(version?): this {
    this.satisfies('notUUID', value => !Base.hasValue(value) || !validator.isUUID(value, version));
    return this;
  }

  // isUppercase
  public isUppercase(): this {
    this.satisfies('isUppercase', value => !Base.hasValue(value) || validator.isUppercase(value));
    return this;
  }

  public notUppercase(): this {
    this.satisfies('notUppercase', value => !Base.hasValue(value) || !validator.isUppercase(value));
    return this;
  }

  // isVariableWidth
  public isVariableWidth(): this {
    this.satisfies('isVariableWidth', value => !Base.hasValue(value) || validator.isVariableWidth(value));
    return this;
  }

  public notVariableWidth(): this {
    this.satisfies('notVariableWidth', value => !Base.hasValue(value) || !validator.isVariableWidth(value));
    return this;
  }

  // isWhitelisted(chars)
  public isWhitelisted(chars): this {
    this.satisfies('isWhitelisted', value => !Base.hasValue(value) || validator.isWhitelisted(value, chars));
    return this;
  }

  public notWhitelisted(chars): this {
    this.satisfies('notWhitelisted', value => !Base.hasValue(value) || !validator.isWhitelisted(value, chars));
    return this;
  }

  // other
  public isMatch(regex: RegExp): this {
    this.satisfies('isMatch', value => !Base.hasValue(value) || regex.test(value));
    return this;
  }

  public notMatch(regex: RegExp): this {
    this.satisfies('notMatch', value => !Base.hasValue(value) || !regex.test(value));
    return this;
  }

  public length(expected: number): this {
    this.satisfies('length', value => !Base.hasValue(value) || value.length === expected);
    return this;
  }

  public lengthInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('lengthInRange', value => !Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
    return this;
  }
}
