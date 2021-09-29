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
const CreateUserErrors_1 = require("./CreateUserErrors");
const Result_1 = require("../../../../shared/core/Result");
const userEmail_1 = require("../../domain/userEmail");
const userPassword_1 = require("../../domain/userPassword");
const AppError_1 = require("../../../../shared/core/AppError");
const user_1 = require("../../domain/user");
const userName_1 = require("../../domain/userName");
const userRoles_1 = require("../../domain/userRoles");
class CreateUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Write your implementation to execute the use case
            const emailOrError = userEmail_1.UserEmail.create({ value: dto.email });
            const passwordOrError = userPassword_1.UserPassword.create({ value: dto.password });
            const usernameOrError = userName_1.UserName.create({ value: dto.username });
            let combinedResult;
            try {
                if (dto.username) {
                    combinedResult = Result_1.Result.combine([emailOrError, passwordOrError, usernameOrError]);
                }
                else {
                    combinedResult = Result_1.Result.combine([emailOrError, passwordOrError]);
                }
                if (combinedResult.isFailure) {
                    return Result_1.left(new AppError_1.AppError.InputError(combinedResult.error));
                }
                // #region 
                const email = emailOrError.getValue();
                const password = passwordOrError.getValue();
                const username = dto.username ? usernameOrError.getValue() : null;
                const userExistsWithEmail = yield this.userRepo.exists(email);
                if (userExistsWithEmail) {
                    return Result_1.left(new CreateUserErrors_1.EmailAlreadyTakenError());
                }
                if (dto.username && (username === null || username === void 0 ? void 0 : username.value)) {
                    const userExistsWithUsername = yield this.userRepo.getUserByUserName(username.value);
                    if (userExistsWithUsername) {
                        return Result_1.left(new CreateUserErrors_1.UsernameAlreadyTakenError());
                    }
                }
                // #endregion
                const userOrError = user_1.User.create({
                    email,
                    password,
                    username: (username === null || username === void 0 ? void 0 : username.value) ? username : undefined,
                    roles: userRoles_1.UserRoles.create({ value: ['Customer'] }).getValue()
                });
                if (userOrError.isFailure) {
                    return Result_1.left(Result_1.Result.fail(userOrError.errorValue().toString()));
                }
                yield this.userRepo.save(userOrError.getValue());
                return Result_1.right(Result_1.Result.ok());
            }
            catch (error) {
                console.log(error);
                return Result_1.left(new AppError_1.AppError.UnexpectedError());
            }
        });
    }
}
exports.default = CreateUser;
