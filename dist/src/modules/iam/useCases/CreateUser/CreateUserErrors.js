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
exports.UserPasswordInvalidError = exports.UsernameAlreadyTakenError = exports.EmailAlreadyTakenError = void 0;
var Result_1 = require("../../../../shared/core/Result");
var EmailAlreadyTakenError = /** @class */ (function (_super) {
    __extends(EmailAlreadyTakenError, _super);
    function EmailAlreadyTakenError() {
        return _super.call(this, false, 'A user exists with that email') || this;
    }
    return EmailAlreadyTakenError;
}(Result_1.Result));
exports.EmailAlreadyTakenError = EmailAlreadyTakenError;
var UsernameAlreadyTakenError = /** @class */ (function (_super) {
    __extends(UsernameAlreadyTakenError, _super);
    function UsernameAlreadyTakenError() {
        return _super.call(this, false, 'Your username is already taken') || this;
    }
    return UsernameAlreadyTakenError;
}(Result_1.Result));
exports.UsernameAlreadyTakenError = UsernameAlreadyTakenError;
var UserPasswordInvalidError = /** @class */ (function (_super) {
    __extends(UserPasswordInvalidError, _super);
    function UserPasswordInvalidError() {
        return _super.call(this, false, 'Password or email is invalid') || this;
    }
    return UserPasswordInvalidError;
}(Result_1.Result));
exports.UserPasswordInvalidError = UserPasswordInvalidError;
