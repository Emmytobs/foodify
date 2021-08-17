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
exports.UserEmail = void 0;
var Result_1 = require("../../../shared/core/Result");
var Entity_1 = require("../../../shared/domain/Entity");
var UserEmail = /** @class */ (function (_super) {
    __extends(UserEmail, _super);
    function UserEmail(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(UserEmail.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    UserEmail.create = function (props) {
        if (!this.isValidEmail(props.value)) {
            return Result_1.Result.fail('Email address is invalid');
        }
        return Result_1.Result.ok(new UserEmail({ value: this.formatEmail(props.value) }));
    };
    UserEmail.isValidEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    UserEmail.formatEmail = function (email) {
        return email.trim().toLowerCase();
    };
    return UserEmail;
}(Entity_1.Entity));
exports.UserEmail = UserEmail;
