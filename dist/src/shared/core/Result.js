"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.left = exports.right = exports.Left = exports.Right = exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(isSuccess, error, value) {
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
    Result.prototype.getValue = function () {
        if (this.isFailure) {
            throw new Error('Can not get the value of a failed result');
        }
        return this.value;
    };
    Result.prototype.errorValue = function () {
        return this.error;
    };
    Result.combine = function (results) {
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            if (result.isFailure)
                return result;
        }
        return Result.ok();
    };
    Result.ok = function (value) {
        return new Result(true, undefined, value);
    };
    Result.fail = function (error) {
        return new Result(false, error);
    };
    return Result;
}());
exports.Result = Result;
var Right = /** @class */ (function () {
    function Right(value) {
        this.value = value;
    }
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    return Right;
}());
exports.Right = Right;
var Left = /** @class */ (function () {
    function Left(value) {
        this.value = value;
    }
    Left.prototype.isRight = function () {
        return false;
    };
    Left.prototype.isLeft = function () {
        return true;
    };
    return Left;
}());
exports.Left = Left;
var right = function (a) {
    return new Right(a);
};
exports.right = right;
var left = function (b) {
    return new Left(b);
};
exports.left = left;
