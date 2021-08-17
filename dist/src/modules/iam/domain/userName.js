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
exports.UserName = void 0;
var Guard_1 = require("../../../shared/core/Guard");
var Result_1 = require("../../../shared/core/Result");
var Entity_1 = require("../../../shared/domain/Entity");
var UserName = /** @class */ (function (_super) {
    __extends(UserName, _super);
    function UserName(props, id) {
        return _super.call(this, props, id) || this;
    }
    Object.defineProperty(UserName.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    UserName.create = function (props) {
        var guardResult = Guard_1.Guard.againstNullOrUndefined(props.value, 'username');
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message || '');
        }
        var hasMinimumChars = Guard_1.Guard.againstAtLeast(this.MIN_CHARACTERS_IN_USERNAME, props.value);
        if (!hasMinimumChars) {
            return Result_1.Result.fail("Username must be at least " + this.MIN_CHARACTERS_IN_USERNAME + " characters");
        }
        ;
        return Result_1.Result.ok(new UserName({ value: props.value }));
    };
    UserName.MIN_CHARACTERS_IN_USERNAME = 3;
    return UserName;
}(Entity_1.Entity));
exports.UserName = UserName;
