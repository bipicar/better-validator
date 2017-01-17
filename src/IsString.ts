/// <reference types="validator" />

import * as validator from 'validator';
import {Base} from './Base';

export class IsString extends Base {
  constructor(path: (string|number)[]) {
    super(path);

    for (const key of Object.keys(validator)) {
      if (!/^is/.test(key)) continue;
      const fn = validator[key];
      if (typeof fn !== 'function') continue;

      this[key] = (...args) => {
        this.satisfies(key, (value) => !Base.hasValue(value) || fn.call(validator, value, ...args));
        return this;
      };

      const notKey = `not${key.slice(2)}`;
      this[notKey] = (...args) => {
        this.satisfies(notKey, (value) => !Base.hasValue(value) || !fn.call(validator, value, ...args));
        return this;
      };
    }
  }

  // isAfter(date?)
  isAfter(date?): this {
    this.satisfies('isAfter', (value) => !Base.hasValue(value) || validator.isAfter(value, date));
    return this;
  }

  notAfter(date?): this {
    this.satisfies('notAfter', (value) => !Base.hasValue(value) || !validator.isAfter(value, date));
    return this;
  }

  // isAlpha(locale?)
  isAlpha(locale?): this {
    this.satisfies('isAlpha', (value) => !Base.hasValue(value) || validator.isAlpha(value, locale));
    return this;
  }

  notAlpha(locale?): this {
    this.satisfies('notAlpha', (value) => !Base.hasValue(value) || !validator.isAlpha(value, locale));
    return this;
  }

  // isAlphanumeric(locale?)
  isAlphanumeric(locale?): this {
    this.satisfies('isAlphanumeric', (value) => !Base.hasValue(value) || validator.isAlphanumeric(value, locale));
    return this;
  }

  notAlphanumeric(locale?): this {
    this.satisfies('notAlphanumeric', (value) => !Base.hasValue(value) || !validator.isAlphanumeric(value, locale));
    return this;
  }

  // isAscii
  isAscii(): this {
    this.satisfies('isAscii', (value) => !Base.hasValue(value) || validator.isAscii(value));
    return this;
  }

  notAscii(): this {
    this.satisfies('notAscii', (value) => !Base.hasValue(value) || !validator.isAscii(value));
    return this;
  }

  // isBefore(date?)
  isBefore(date?): this {
    this.satisfies('isBefore', (value) => !Base.hasValue(value) || validator.isBefore(value, date));
    return this;
  }

  notBefore(date?): this {
    this.satisfies('notBefore', (value) => !Base.hasValue(value) || !validator.isBefore(value, date));
    return this;
  }

  // isBoolean
  isBoolean(): this {
    this.satisfies('isBoolean', (value) => !Base.hasValue(value) || validator.isBoolean(value));
    return this;
  }

  notBoolean(): this {
    this.satisfies('notBoolean', (value) => !Base.hasValue(value) || !validator.isBoolean(value));
    return this;
  }

  // isByteLength(options)
  isByteLength(options): this {
    this.satisfies('isByteLength', (value) => !Base.hasValue(value) || validator.isByteLength(value, options));
    return this;
  }

  notByteLength(options): this {
    this.satisfies('notByteLength', (value) => !Base.hasValue(value) || !validator.isByteLength(value, options));
    return this;
  }

  // isCreditCard
  isCreditCard(): this {
    this.satisfies('isCreditCard', (value) => !Base.hasValue(value) || validator.isCreditCard(value));
    return this;
  }

  notCreditCard(): this {
    this.satisfies('notCreditCard', (value) => !Base.hasValue(value) || !validator.isCreditCard(value));
    return this;
  }

  // isCurrency(options)
  isCurrency(options): this {
    this.satisfies('isCurrency', (value) => !Base.hasValue(value) || validator.isCurrency(value, options));
    return this;
  }

  notCurrency(options): this {
    this.satisfies('notCurrency', (value) => !Base.hasValue(value) || !validator.isCurrency(value, options));
    return this;
  }

  // isDataURI
  isDataURI(): this {
    this.satisfies('isDataURI', (value) => !Base.hasValue(value) || validator.isDataURI(value));
    return this;
  }

  notDataURI(): this {
    this.satisfies('notDataURI', (value) => !Base.hasValue(value) || !validator.isDataURI(value));
    return this;
  }

  // isDate
  isDate(): this {
    this.satisfies('isDate', (value) => !Base.hasValue(value) || validator.isDate(value));
    return this;
  }

  notDate(): this {
    this.satisfies('notDate', (value) => !Base.hasValue(value) || !validator.isDate(value));
    return this;
  }

  // isDecimal
  isDecimal(): this {
    this.satisfies('isDecimal', (value) => !Base.hasValue(value) || validator.isDecimal(value));
    return this;
  }

  notDecimal(): this {
    this.satisfies('notDecimal', (value) => !Base.hasValue(value) || !validator.isDecimal(value));
    return this;
  }

  // isDivisibleBy(number)
  isDivisibleBy(number): this {
    this.satisfies('isDivisibleBy', (value) => !Base.hasValue(value) || validator.isDivisibleBy(value, number));
    return this;
  }

  notDivisibleBy(number): this {
    this.satisfies('notDivisibleBy', (value) => !Base.hasValue(value) || !validator.isDivisibleBy(value, number));
    return this;
  }

  // isEmail(options?)
  isEmail(options?): this {
    this.satisfies('isEmail', (value) => !Base.hasValue(value) || validator.isEmail(value, options));
    return this;
  }

  notEmail(options?): this {
    this.satisfies('notEmail', (value) => !Base.hasValue(value) || !validator.isEmail(value, options));
    return this;
  }

  // isEmpty
  isEmpty(): this {
    this.satisfies('isEmpty', (value) => !Base.hasValue(value) || validator.isEmpty(value));
    return this;
  }

  notEmpty(): this {
    this.satisfies('notEmpty', (value) => !Base.hasValue(value) || !validator.isEmpty(value));
    return this;
  }

  // isFQDN(options?)
  isFQDN(options?): this {
    this.satisfies('isFQDN', (value) => !Base.hasValue(value) || validator.isFQDN(value, options));
    return this;
  }

  notFQDN(options?): this {
    this.satisfies('notFQDN', (value) => !Base.hasValue(value) || !validator.isFQDN(value, options));
    return this;
  }

  // isFloat(options?)
  isFloat(options?): this {
    this.satisfies('isFloat', (value) => !Base.hasValue(value) || validator.isFloat(value, options));
    return this;
  }

  notFloat(options?): this {
    this.satisfies('notFloat', (value) => !Base.hasValue(value) || !validator.isFloat(value, options));
    return this;
  }

  // isFullWidth
  isFullWidth(): this {
    this.satisfies('isFullWidth', (value) => !Base.hasValue(value) || validator.isFullWidth(value));
    return this;
  }

  notFullWidth(): this {
    this.satisfies('notFullWidth', (value) => !Base.hasValue(value) || !validator.isFullWidth(value));
    return this;
  }

  // isHalfWidth
  isHalfWidth(): this {
    this.satisfies('isHalfWidth', (value) => !Base.hasValue(value) || validator.isHalfWidth(value));
    return this;
  }

  notHalfWidth(): this {
    this.satisfies('notHalfWidth', (value) => !Base.hasValue(value) || !validator.isHalfWidth(value));
    return this;
  }

  // isHexColor
  isHexColor(): this {
    this.satisfies('isHexColor', (value) => !Base.hasValue(value) || validator.isHexColor(value));
    return this;
  }

  notHexColor(): this {
    this.satisfies('notHexColor', (value) => !Base.hasValue(value) || !validator.isHexColor(value));
    return this;
  }

  // isHexadecimal
  isHexadecimal(): this {
    this.satisfies('isHexadecimal', (value) => !Base.hasValue(value) || validator.isHexadecimal(value));
    return this;
  }

  notHexadecimal(): this {
    this.satisfies('notHexadecimal', (value) => !Base.hasValue(value) || !validator.isHexadecimal(value));
    return this;
  }

  // isIP(version?)
  isIP(version?): this {
    this.satisfies('isIP', (value) => !Base.hasValue(value) || validator.isIP(value, version));
    return this;
  }

  notIP(version?): this {
    this.satisfies('notIP', (value) => !Base.hasValue(value) || !validator.isIP(value, version));
    return this;
  }

  // isISBN(version?)
  isISBN(version?): this {
    this.satisfies('isISBN', (value) => !Base.hasValue(value) || validator.isISBN(value, version));
    return this;
  }

  notISBN(version?): this {
    this.satisfies('notISBN', (value) => !Base.hasValue(value) || !validator.isISBN(value, version));
    return this;
  }

  // isISIN
  isISIN(): this {
    this.satisfies('isISIN', (value) => !Base.hasValue(value) || validator.isISIN(value));
    return this;
  }

  notISIN(): this {
    this.satisfies('notISIN', (value) => !Base.hasValue(value) || !validator.isISIN(value));
    return this;
  }

  // isISO8601
  isISO8601(): this {
    this.satisfies('isISO8601', (value) => !Base.hasValue(value) || validator.isISO8601(value));
    return this;
  }

  notISO8601(): this {
    this.satisfies('notISO8601', (value) => !Base.hasValue(value) || !validator.isISO8601(value));
    return this;
  }

  // isIn(values)
  isIn(values): this {
    this.satisfies('isIn', (value) => !Base.hasValue(value) || validator.isIn(value, values));
    return this;
  }

  notIn(values): this {
    this.satisfies('notIn', (value) => !Base.hasValue(value) || !validator.isIn(value, values));
    return this;
  }

  // isInt(options?)
  isInt(options?): this {
    this.satisfies('isInt', (value) => !Base.hasValue(value) || validator.isInt(value, options));
    return this;
  }

  notInt(options?): this {
    this.satisfies('notInt', (value) => !Base.hasValue(value) || !validator.isInt(value, options));
    return this;
  }

  // isJSON
  isJSON(): this {
    this.satisfies('isJSON', (value) => !Base.hasValue(value) || validator.isJSON(value));
    return this;
  }

  notJSON(): this {
    this.satisfies('notJSON', (value) => !Base.hasValue(value) || !validator.isJSON(value));
    return this;
  }

  // isLength(options)
  isLength(options): this {
    this.satisfies('isLength', (value) => !Base.hasValue(value) || validator.isLength(value, options));
    return this;
  }

  notLength(options): this {
    this.satisfies('notLength', (value) => !Base.hasValue(value) || !validator.isLength(value, options));
    return this;
  }

  // isLowercase
  isLowercase(): this {
    this.satisfies('isLowercase', (value) => !Base.hasValue(value) || validator.isLowercase(value));
    return this;
  }

  notLowercase(): this {
    this.satisfies('notLowercase', (value) => !Base.hasValue(value) || !validator.isLowercase(value));
    return this;
  }

  // isMACAddress
  isMACAddress(): this {
    this.satisfies('isMACAddress', (value) => !Base.hasValue(value) || validator.isMACAddress(value));
    return this;
  }

  notMACAddress(): this {
    this.satisfies('notMACAddress', (value) => !Base.hasValue(value) || !validator.isMACAddress(value));
    return this;
  }

  // isMD5
  isMD5(): this {
    this.satisfies('isMD5', (value) => !Base.hasValue(value) || validator.isMD5(value));
    return this;
  }

  notMD5(): this {
    this.satisfies('notMD5', (value) => !Base.hasValue(value) || !validator.isMD5(value));
    return this;
  }

  // isMobilePhone(locale)
  isMobilePhone(locale): this {
    this.satisfies('isMobilePhone', (value) => !Base.hasValue(value) || validator.isMobilePhone(value, locale));
    return this;
  }

  notMobilePhone(locale): this {
    this.satisfies('notMobilePhone', (value) => !Base.hasValue(value) || !validator.isMobilePhone(value, locale));
    return this;
  }

  // isMongoId
  isMongoId(): this {
    this.satisfies('isMongoId', (value) => !Base.hasValue(value) || validator.isMongoId(value));
    return this;
  }

  notMongoId(): this {
    this.satisfies('notMongoId', (value) => !Base.hasValue(value) || !validator.isMongoId(value));
    return this;
  }

  // isMultibyte
  isMultibyte(): this {
    this.satisfies('isMultibyte', (value) => !Base.hasValue(value) || validator.isMultibyte(value));
    return this;
  }

  notMultibyte(): this {
    this.satisfies('notMultibyte', (value) => !Base.hasValue(value) || !validator.isMultibyte(value));
    return this;
  }

  // isNumeric
  isNumeric(): this {
    this.satisfies('isNumeric', (value) => !Base.hasValue(value) || validator.isNumeric(value));
    return this;
  }

  notNumeric(): this {
    this.satisfies('notNumeric', (value) => !Base.hasValue(value) || !validator.isNumeric(value));
    return this;
  }

  // isSurrogatePair
  isSurrogatePair(): this {
    this.satisfies('isSurrogatePair', (value) => !Base.hasValue(value) || validator.isSurrogatePair(value));
    return this;
  }

  notSurrogatePair(): this {
    this.satisfies('notSurrogatePair', (value) => !Base.hasValue(value) || !validator.isSurrogatePair(value));
    return this;
  }

  // isURL(options?)
  isURL(options?): this {
    this.satisfies('isURL', (value) => !Base.hasValue(value) || validator.isURL(value, options));
    return this;
  }

  notURL(options?): this {
    this.satisfies('notURL', (value) => !Base.hasValue(value) || !validator.isURL(value, options));
    return this;
  }

  // isUUID(version?)
  isUUID(version?): this {
    this.satisfies('isUUID', (value) => !Base.hasValue(value) || validator.isUUID(value, version));
    return this;
  }

  notUUID(version?): this {
    this.satisfies('notUUID', (value) => !Base.hasValue(value) || !validator.isUUID(value, version));
    return this;
  }

  // isUppercase
  isUppercase(): this {
    this.satisfies('isUppercase', (value) => !Base.hasValue(value) || validator.isUppercase(value));
    return this;
  }

  notUppercase(): this {
    this.satisfies('notUppercase', (value) => !Base.hasValue(value) || !validator.isUppercase(value));
    return this;
  }

  // isVariableWidth
  isVariableWidth(): this {
    this.satisfies('isVariableWidth', (value) => !Base.hasValue(value) || validator.isVariableWidth(value));
    return this;
  }

  notVariableWidth(): this {
    this.satisfies('notVariableWidth', (value) => !Base.hasValue(value) || !validator.isVariableWidth(value));
    return this;
  }

  // isWhitelisted(chars)
  isWhitelisted(chars): this {
    this.satisfies('isWhitelisted', (value) => !Base.hasValue(value) || validator.isWhitelisted(value, chars));
    return this;
  }

  notWhitelisted(chars): this {
    this.satisfies('notWhitelisted', (value) => !Base.hasValue(value) || !validator.isWhitelisted(value, chars));
    return this;
  }

  // other
  isMatch(regex: RegExp): this {
    this.satisfies('isMatch', (value) => !Base.hasValue(value) || regex.test(value));
    return this;
  }

  notMatch(regex: RegExp): this {
    this.satisfies('notMatch', (value) => !Base.hasValue(value) || !regex.test(value));
    return this;
  }

  length(expected: number): this {
    this.satisfies('length', (value) => !Base.hasValue(value) || value.length === expected);
    return this;
  }

  lengthInRange(lower: number | undefined, upper?: number | undefined): this {
    this.satisfies('lengthInRange', (value) => !Base.hasValue(value) || (lower === undefined || value.length >= lower) && (upper === undefined || value.length <= upper));
    return this;
  }
}
