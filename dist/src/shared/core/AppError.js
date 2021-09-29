"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const Result_1 = require("./Result");
var AppError;
(function (AppError) {
    class UnexpectedError extends Result_1.Result {
        constructor() {
            super(false, {
                message: 'An unexpected error occured'
            });
        }
    }
    AppError.UnexpectedError = UnexpectedError;
    class InputError extends Result_1.Result {
        constructor(errorMessage) {
            super(false, {
                message: errorMessage
            });
        }
    }
    AppError.InputError = InputError;
})(AppError = exports.AppError || (exports.AppError = {}));
