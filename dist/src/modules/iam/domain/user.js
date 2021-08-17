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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var Guard_1 = require("../../../shared/core/Guard");
var Result_1 = require("../../../shared/core/Result");
var AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
var UserCreated_1 = require("./events/UserCreated");
var userId_1 = require("./userId");
var userName_1 = require("./userName");
var userPassword_1 = require("./userPassword");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(props, id) {
        return _super.call(this, props, id) || this;
    }
    Object.defineProperty(User.prototype, "userId", {
        get: function () { return userId_1.UserId.create(this._id).getValue(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "firstname", {
        get: function () { return this.props.firstname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastname", {
        get: function () { return this.props.lastname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        get: function () { return this.props.username; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () { return this.props.email; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () { return this.props.password; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "roles", {
        get: function () { return this.props.roles; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isEmailVerified", {
        get: function () { return this.props.isEmailVerified; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastLogin", {
        get: function () { return this.props.lastLogin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "createdAt", {
        get: function () { return this.props.createdAt; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "updatedAt", {
        get: function () { return this.props.updatedAt; },
        enumerable: false,
        configurable: true
    });
    User.prototype.updateFirstname = function (firstname) {
        this.props.firstname = firstname;
        return Result_1.Result.ok();
    };
    User.prototype.updateLastname = function (lastname) {
        this.props.lastname = lastname;
        return Result_1.Result.ok();
    };
    User.prototype.updatePassword = function (password) {
        var passwordOrError = userPassword_1.UserPassword.create({ value: password, hashed: false });
        if (passwordOrError.isFailure) {
            return Result_1.Result.fail(passwordOrError.errorValue().toString());
        }
        this.props.password = passwordOrError.getValue();
        return Result_1.Result.ok();
    };
    User.prototype.updateUsername = function (username) {
        var usernameOrError = userName_1.UserName.create({ value: username });
        if (usernameOrError.isFailure) {
            return Result_1.Result.fail(usernameOrError.errorValue().toString());
        }
        this.props.username = usernameOrError.getValue();
        return Result_1.Result.ok();
    };
    User.create = function (props, id) {
        //#Step 1 - Validate user data using the Guard class
        var guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.email, argumentName: 'UserEmail' },
            { argument: props.password, argumentName: 'UserPassword' }
        ]);
        // if invalid send an error, else continue
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message || '');
        }
        //#Step 2 - If it's a new user, simply send a domain event. Else, return an instance of the user.
        var user = new User(__assign(__assign({}, props), { isEmailVerified: props.isEmailVerified || false, lastLogin: props.lastLogin || new Date(), createdAt: props.createdAt || new Date(), updatedAt: props.updatedAt || new Date() }));
        var isNewUser = !id;
        if (isNewUser) {
            // Send domain event
            user.addDomainEvent(new UserCreated_1.UserCreated(user));
        }
        // return instance of user
        return Result_1.Result.ok(user);
    };
    return User;
}(AggregateRoot_1.AggregateRoot));
exports.User = User;
