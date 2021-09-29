"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
class Guard {
    static combine(guardResults) {
        for (let result of guardResults) {
            if (result.succeeded === false)
                return result;
        }
        return { succeeded: true };
    }
    static greaterThan(minValue, actualValue) {
        return actualValue > minValue
            ? { succeeded: true }
            : {
                succeeded: false,
                message: `Number given {${actualValue}} is not greater than {${minValue}}`
            };
    }
    static againstAtLeast(numChars, text) {
        return text.length >= numChars
            ? { succeeded: true }
            : {
                succeeded: false,
                message: `Text is not at least ${numChars} chars.`
            };
    }
    static againstAtMost(numChars, text) {
        return text.length <= numChars
            ? { succeeded: true }
            : {
                succeeded: false,
                message: `Text is greater than ${numChars} chars.`
            };
    }
    static againstNullOrUndefined(argument, argumentName) {
        if (argument === null || argument === undefined) {
            return { succeeded: false, message: `${argumentName} is null or undefined` };
        }
        else {
            return { succeeded: true };
        }
    }
    static againstNullOrUndefinedBulk(args) {
        for (let arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeeded)
                return result;
        }
        return { succeeded: true };
    }
    static isOneOf(value, validValues, argumentName) {
        let isValid = false;
        for (let validValue of validValues) {
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
                message: `${argumentName} isn't one of the correct types in ${JSON.stringify(validValues)}. Got "${value}".`
            };
        }
    }
    static areOneOf(validValues, args) {
        for (const arg of args) {
            const result = this.isOneOf(arg.argument, validValues, arg.argumentName);
            if (!result.succeeded) {
                return result;
            }
        }
        return { succeeded: true };
        // if (!result.succeeded) {
        //   return result;
        // }
    }
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
    static inRange(num, min, max, argumentName) {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.` };
        }
        else {
            return { succeeded: true };
        }
    }
    static allInRange(numbers, min, max, argumentName) {
        let failingResult = null;
        for (let num of numbers) {
            const numIsInRangeResult = this.inRange(num, min, max, argumentName);
            if (!numIsInRangeResult.succeeded)
                failingResult = numIsInRangeResult;
        }
        if (failingResult) {
            return { succeeded: false, message: `${argumentName} is not within the range.` };
        }
        else {
            return { succeeded: true };
        }
    }
}
exports.Guard = Guard;
