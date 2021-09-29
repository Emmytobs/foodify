"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const Result_1 = require("../../../../shared/core/Result");
class UserNotFoundError extends Result_1.Result {
    constructor() {
        super(false, { message: 'User in token does not exist' });
    }
}
exports.UserNotFoundError = UserNotFoundError;
