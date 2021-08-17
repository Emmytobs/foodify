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
exports.UserIdNotProvided = exports.UserNotFoundError = void 0;
var Result_1 = require("../../../../shared/core/Result");
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError(userId) {
        return _super.call(this, false, {
            message: "User with userId " + userId + " does not exist"
        }) || this;
    }
    return UserNotFoundError;
}(Result_1.Result));
exports.UserNotFoundError = UserNotFoundError;
;
var UserIdNotProvided = /** @class */ (function (_super) {
    __extends(UserIdNotProvided, _super);
    function UserIdNotProvided() {
        return _super.call(this, false, {
            message: '[UserIdNotProvidedError]: User id not provided.'
        }) || this;
    }
    return UserIdNotProvided;
}(Result_1.Result));
exports.UserIdNotProvided = UserIdNotProvided;
