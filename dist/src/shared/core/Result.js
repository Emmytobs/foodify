"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.left = exports.right = exports.Left = exports.Right = exports.Result = void 0;
class Result {
    constructor(isSuccess, error, value) {
        if (isSuccess && error) {
            throw new Error('[InvalidOperation]: A result can not be success and failure');
        }
        if (!isSuccess && !error) {
            throw new Error('[InvalidOperation]: A failed result must contain an error message');
        }
        if (!isSuccess && value) {
            throw new Error('[InvalidOperation]: A failed result must not contain a value');
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.value = value;
        this.error = error;
    }
    getValue() {
        if (this.isFailure) {
            throw new Error('Can not get the value of a failed result');
        }
        return this.value;
    }
    errorValue() {
        return this.error;
    }
    static combine(results) {
        for (const result of results) {
            if (result.isFailure)
                return result;
        }
        return Result.ok();
    }
    static ok(value) {
        return new Result(true, undefined, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
}
exports.Result = Result;
class Right {
    constructor(value) {
        this.value = value;
    }
    isRight() {
        return true;
    }
    isLeft() {
        return false;
    }
}
exports.Right = Right;
class Left {
    constructor(value) {
        this.value = value;
    }
    isRight() {
        return false;
    }
    isLeft() {
        return true;
    }
}
exports.Left = Left;
const right = (a) => {
    return new Right(a);
};
exports.right = right;
const left = (b) => {
    return new Left(b);
};
exports.left = left;
