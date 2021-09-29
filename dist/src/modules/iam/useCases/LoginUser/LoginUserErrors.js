"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordDoesntMatch = exports.PasswordOrEmailInvalid = exports.UserDoesNotExist = void 0;
const Result_1 = require("../../../../shared/core/Result");
class UserDoesNotExist extends Result_1.Result {
    constructor() {
        super(false, {
            message: 'User not found'
        });
    }
}
exports.UserDoesNotExist = UserDoesNotExist;
class PasswordOrEmailInvalid extends Result_1.Result {
    constructor() {
        super(false, {
            message: 'Email or password is invalid'
        });
    }
}
exports.PasswordOrEmailInvalid = PasswordOrEmailInvalid;
class PasswordDoesntMatch extends Result_1.Result {
    constructor() {
        super(false, {
            message: 'Email or password is invalid'
        });
    }
}
exports.PasswordDoesntMatch = PasswordDoesntMatch;
