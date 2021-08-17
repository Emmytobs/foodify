"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
var Guard = /** @class */ (function () {
    function Guard() {
    }
    Guard.combine = function (guardResults) {
        for (var _i = 0, guardResults_1 = guardResults; _i < guardResults_1.length; _i++) {
            var result = guardResults_1[_i];
            if (result.succeeded === false)
                return result;
        }
        return { succeeded: true };
    };
    Guard.greaterThan = function (minValue, actualValue) {
        return actualValue > minValue
            ? { succeeded: true }
            : {
                succeeded: false,
                message: "Number given {" + actualValue + "} is not greater than {" + minValue + "}"
            };
    };
    Guard.againstAtLeast = function (numChars, text) {
        return text.length >= numChars
            ? { succeeded: true }
            : {
                succeeded: false,
                message: "Text is not at least " + numChars + " chars."
            };
    };
    Guard.againstAtMost = function (numChars, text) {
        return text.length <= numChars
            ? { succeeded: true }
            : {
                succeeded: false,
                message: "Text is greater than " + numChars + " chars."
            };
    };
    Guard.againstNullOrUndefined = function (argument, argumentName) {
        if (argument === null || argument === undefined) {
            return { succeeded: false, message: argumentName + " is null or undefined" };
        }
        else {
            return { succeeded: true };
        }
    };
    Guard.againstNullOrUndefinedBulk = function (args) {
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            var result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeeded)
                return result;
        }
        return { succeeded: true };
    };
    Guard.isOneOf = function (value, validValues, argumentName) {
        var isValid = false;
        for (var _i = 0, validValues_1 = validValues; _i < validValues_1.length; _i++) {
            var validValue = validValues_1[_i];
            if (value === validValue) {
                isValid = true;
            }
        }
        if (isValid) {
            return { succeeded: true };
        }
        else {
            return {
                succeeded: false,
                message: argumentName + " isn't one of the correct types in " + JSON.stringify(validValues) + ". Got \"" + value + "\"."
            };
        }
    };
    Guard.areOneOf = function (validValues, args) {
        for (var _i = 0, args_2 = args; _i < args_2.length; _i++) {
            var arg = args_2[_i];
            var result = this.isOneOf(arg.argument, validValues, arg.argumentName);
            if (!result.succeeded) {
                return result;
            }
        }
        return { succeeded: true };
        // if (!result.succeeded) {
        //   return result;
        // }
    };
    // Verify if this method and the one after it are correctly implemented
    // public static isOneOfEnum (value: any, enumObject: any, argumentName: string): IGuardResult {
    //   const isValidValueInEnum = !!~Object.values(enumObject).some(enumValue => enumValue === value);
    //   if (isValidValueInEnum) {
    //     return { succeeded: true }
    //   }
    //   return {
    //     succeeded: false,
    //     message: `${argumentName} is not oneOf the correct values in ${JSON.stringify(enumObject)}. Got "${value}"`
    //   }
    // }
    // public static isOneOfEnumBulk (enumObject: any, args: GuardArgumentCollection): IGuardResult {
    //   for (const arg of args) {
    //     const result = this.isOneOfEnum(arg.argument, enumObject, arg.argumentName);
    //     if (!result) {
    //       return result;
    //     }
    //     return { succeeded: true };
    //   }
    // }
    Guard.inRange = function (num, min, max, argumentName) {
        var isInRange = num >= min && num <= max;
        if (!isInRange) {
            return { succeeded: false, message: argumentName + " is not within range " + min + " to " + max + "." };
        }
        else {
            return { succeeded: true };
        }
    };
    Guard.allInRange = function (numbers, min, max, argumentName) {
        var failingResult = null;
        for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
            var num = numbers_1[_i];
            var numIsInRangeResult = this.inRange(num, min, max, argumentName);
            if (!numIsInRangeResult.succeeded)
                failingResult = numIsInRangeResult;
        }
        if (failingResult) {
            return { succeeded: false, message: argumentName + " is not within the range." };
        }
        else {
            return { succeeded: true };
        }
    };
    return Guard;
}());
exports.Guard = Guard;
