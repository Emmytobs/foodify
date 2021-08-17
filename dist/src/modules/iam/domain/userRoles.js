"use strict";
// export type UserRoles = 'Vendor' | 'Customer' | 'Worker'
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
exports.UserRoles = void 0;
var Result_1 = require("../../../shared/core/Result");
var Entity_1 = require("../../../shared/domain/Entity");
;
var UserRoles = /** @class */ (function (_super) {
    __extends(UserRoles, _super);
    function UserRoles(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(UserRoles.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    UserRoles.create = function (props) {
        if (!this.isValidRole(props)) {
            return Result_1.Result.fail('User role is invalid');
        }
        return Result_1.Result.ok();
    };
    UserRoles.isValidRole = function (roles) {
        if (!roles.value.includes('Customer') ||
            !roles.value.includes('Vendor') ||
            !roles.value.includes('Worker')) {
            return false;
        }
        return true;
    };
    return UserRoles;
}(Entity_1.Entity));
exports.UserRoles = UserRoles;
