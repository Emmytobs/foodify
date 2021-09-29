"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdNotProvided = exports.UserNotFoundError = void 0;
const Result_1 = require("../../../../shared/core/Result");
class UserNotFoundError extends Result_1.Result {
    constructor(userId) {
        super(false, {
            message: `User with userId ${userId} does not exist`
        });
    }
}
exports.UserNotFoundError = UserNotFoundError;
;
class UserIdNotProvided extends Result_1.Result {
    constructor() {
        super(false, {
            message: '[UserIdNotProvidedError]: User id not provided.'
        });
    }
}
exports.UserIdNotProvided = UserIdNotProvided;
