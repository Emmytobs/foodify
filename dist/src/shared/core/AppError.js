"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
var Result_1 = require("./Result");
var AppError;
(function (AppError) {
    var UnexpectedError = /** @class */ (function (_super) {
        __extends(UnexpectedError, _super);
        function UnexpectedError() {
            return _super.call(this, false, {
                message: 'An unexpected error occured'
            }) || this;
        }
        return UnexpectedError;
    }(Result_1.Result));
    AppError.UnexpectedError = UnexpectedError;
    var InputError = /** @class */ (function (_super) {
        __extends(InputError, _super);
        function InputError(errorMessage) {
            return _super.call(this, false, {
                message: errorMessage
            }) || this;
        }
        return InputError;
    }(Result_1.Result));
    AppError.InputError = InputError;
})(AppError = exports.AppError || (exports.AppError = {}));
