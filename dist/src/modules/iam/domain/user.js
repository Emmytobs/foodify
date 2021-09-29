"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Guard_1 = require("../../../shared/core/Guard");
const Result_1 = require("../../../shared/core/Result");
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
const UserCreated_1 = require("./events/UserCreated");
const userId_1 = require("./userId");
const userName_1 = require("./userName");
const userPassword_1 = require("./userPassword");
class User extends AggregateRoot_1.AggregateRoot {
    get userId() { return userId_1.UserId.create(this._id).getValue(); }
    get firstname() { return this.props.firstname; }
    get lastname() { return this.props.lastname; }
    get username() { return this.props.username; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get roles() { return this.props.roles; }
    get isEmailVerified() { return this.props.isEmailVerified; }
    get lastLogin() { return this.props.lastLogin; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }
    updateFirstname(firstname) {
        this.props.firstname = firstname;
        return Result_1.Result.ok();
    }
    updateLastname(lastname) {
        this.props.lastname = lastname;
        return Result_1.Result.ok();
    }
    updatePassword(password) {
        const passwordOrError = userPassword_1.UserPassword.create({ value: password, hashed: false });
        if (passwordOrError.isFailure) {
            return Result_1.Result.fail(passwordOrError.errorValue().toString());
        }
        this.props.password = passwordOrError.getValue();
        return Result_1.Result.ok();
    }
    updateUsername(username) {
        const usernameOrError = userName_1.UserName.create({ value: username });
        if (usernameOrError.isFailure) {
            return Result_1.Result.fail(usernameOrError.errorValue().toString());
        }
        this.props.username = usernameOrError.getValue();
        return Result_1.Result.ok();
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        //#Step 1 - Validate user data using the Guard class
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.email, argumentName: 'UserEmail' },
            { argument: props.password, argumentName: 'UserPassword' }
        ]);
        // if invalid send an error, else continue
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message || '');
        }
        //#Step 2 - If it's a new user, simply send a domain event. Else, return an instance of the user.
        const user = new User(Object.assign(Object.assign({}, props), { isEmailVerified: props.isEmailVerified || false, lastLogin: props.lastLogin || new Date(), createdAt: props.createdAt || new Date(), updatedAt: props.updatedAt || new Date() }));
        const isNewUser = !id;
        if (isNewUser) {
            // Send domain event
            user.addDomainEvent(new UserCreated_1.UserCreated(user));
        }
        // return instance of user
        return Result_1.Result.ok(user);
    }
}
exports.User = User;
