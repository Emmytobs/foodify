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
exports.PasswordDoesntMatch = exports.PasswordOrEmailInvalid = exports.UserDoesNotExist = void 0;
var Result_1 = require("../../../../shared/core/Result");
var UserDoesNotExist = /** @class */ (function (_super) {
    __extends(UserDoesNotExist, _super);
    function UserDoesNotExist() {
        return _super.call(this, false, {
            message: 'User not found'
        }) || this;
    }
    return UserDoesNotExist;
}(Result_1.Result));
exports.UserDoesNotExist = UserDoesNotExist;
var PasswordOrEmailInvalid = /** @class */ (function (_super) {
    __extends(PasswordOrEmailInvalid, _super);
    function PasswordOrEmailInvalid() {
        return _super.call(this, false, {
            message: 'Email or password is invalid'
        }) || this;
    }
    return PasswordOrEmailInvalid;
}(Result_1.Result));
exports.PasswordOrEmailInvalid = PasswordOrEmailInvalid;
var PasswordDoesntMatch = /** @class */ (function (_super) {
    __extends(PasswordDoesntMatch, _super);
    function PasswordDoesntMatch() {
        return _super.call(this, false, {
            message: 'Email or password is invalid'
        }) || this;
    }
    return PasswordDoesntMatch;
}(Result_1.Result));
exports.PasswordDoesntMatch = PasswordDoesntMatch;
