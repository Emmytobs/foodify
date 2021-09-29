"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordInvalidError = exports.UsernameAlreadyTakenError = exports.EmailAlreadyTakenError = void 0;
const Result_1 = require("../../../../shared/core/Result");
class EmailAlreadyTakenError extends Result_1.Result {
    constructor() {
        super(false, { message: 'A user exists with that email' });
    }
}
exports.EmailAlreadyTakenError = EmailAlreadyTakenError;
class UsernameAlreadyTakenError extends Result_1.Result {
    constructor() {
        super(false, { message: 'Your username is already taken' });
    }
}
exports.UsernameAlreadyTakenError = UsernameAlreadyTakenError;
class UserPasswordInvalidError extends Result_1.Result {
    constructor() {
        super(false, { message: 'Password or email is invalid' });
    }
}
exports.UserPasswordInvalidError = UserPasswordInvalidError;
const e = new EmailAlreadyTakenError();
