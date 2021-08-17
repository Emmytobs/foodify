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
exports.PropertyToUpdateIsInvalid = exports.UserNotFoundError = exports.InvalidUpdateError = void 0;
var Result_1 = require("../../../../shared/core/Result");
var InvalidUpdateError = /** @class */ (function (_super) {
    __extends(InvalidUpdateError, _super);
    function InvalidUpdateError() {
        return _super.call(this, false, {
            message: 'Update operation is invalid'
        }) || this;
    }
    return InvalidUpdateError;
}(Result_1.Result));
exports.InvalidUpdateError = InvalidUpdateError;
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError(userId) {
        return _super.call(this, false, {
            message: "No user found with id " + userId
        }) || this;
    }
    return UserNotFoundError;
}(Result_1.Result));
exports.UserNotFoundError = UserNotFoundError;
var PropertyToUpdateIsInvalid = /** @class */ (function (_super) {
    __extends(PropertyToUpdateIsInvalid, _super);
    function PropertyToUpdateIsInvalid(message) {
        return _super.call(this, false, {
            message: message
        }) || this;
    }
    return PropertyToUpdateIsInvalid;
}(Result_1.Result));
exports.PropertyToUpdateIsInvalid = PropertyToUpdateIsInvalid;
