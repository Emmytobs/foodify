"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyToUpdateIsInvalid = exports.UserNotFoundError = exports.InvalidUpdateError = void 0;
const Result_1 = require("../../../../shared/core/Result");
class InvalidUpdateError extends Result_1.Result {
    constructor() {
        super(false, {
            message: 'Update operation is invalid'
        });
    }
}
exports.InvalidUpdateError = InvalidUpdateError;
class UserNotFoundError extends Result_1.Result {
    constructor(userId) {
        super(false, {
            message: `No user found with id ${userId}`
        });
    }
}
exports.UserNotFoundError = UserNotFoundError;
class PropertyToUpdateIsInvalid extends Result_1.Result {
    constructor(message) {
        super(false, {
            message
        });
    }
}
exports.PropertyToUpdateIsInvalid = PropertyToUpdateIsInvalid;
