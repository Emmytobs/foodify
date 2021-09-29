"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const user_1 = require("../domain/user");
const userEmail_1 = require("../domain/userEmail");
const userName_1 = require("../domain/userName");
const userPassword_1 = require("../domain/userPassword");
class UserMap {
    // static toDTO() {
    // }
    static toDomain(user) {
        var _a;
        const emailOrError = userEmail_1.UserEmail.create(user.email);
        const passwordOrError = userPassword_1.UserPassword.create({ value: user.password, hashed: true });
        const usernameOrError = userName_1.UserName.create({ value: user.username });
        const userOrError = user_1.User.create({
            email: emailOrError.getValue(),
            password: passwordOrError.getValue(),
            firstname: user.firstname,
            roles: user.roles,
            username: usernameOrError.getValue()
        });
        if (userOrError.isFailure) {
            // If it's a failed result, throw an error
            throw new Error((_a = userOrError.error) === null || _a === void 0 ? void 0 : _a.toString());
        }
        return userOrError.getValue();
    }
    static toPersistence(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let password;
            if (user.password.isHashed()) {
                password = user.password.value;
            }
            else {
                password = yield user.password.getHashedValue();
            }
            return {
                userId: user.userId.id.toString(),
                firstname: user.firstname,
                lastname: user.lastname,
                username: (_a = user.username) === null || _a === void 0 ? void 0 : _a.value,
                email: user.email.value,
                password,
                is_email_verified: user.isEmailVerified,
                roles: user.roles.value,
                lastLogin: user.lastLogin
            };
        });
    }
}
exports.UserMap = UserMap;
