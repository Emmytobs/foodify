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
exports.LoginUser = void 0;
const AppError_1 = require("../../../../shared/core/AppError");
const Guard_1 = require("../../../../shared/core/Guard");
const Result_1 = require("../../../../shared/core/Result");
const userEmail_1 = require("../../domain/userEmail");
const userPassword_1 = require("../../domain/userPassword");
const LoginUserErrors_1 = require("./LoginUserErrors");
class LoginUser {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    execute(dto) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#region - Check for nothingness in the DTO
                const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
                    { argument: dto.email, argumentName: 'email' },
                    { argument: dto.password, argumentName: 'password' }
                ]);
                if (!guardResult.succeeded) {
                    return Result_1.left(new AppError_1.AppError.InputError(guardResult.message || ''));
                }
                //#endregion
                //#region - Run validation on the email and password
                const emailOrError = userEmail_1.UserEmail.create({ value: dto.email });
                const passwordOrError = userPassword_1.UserPassword.create({ value: dto.password, hashed: false });
                const combinedResult = Result_1.Result.combine([emailOrError, passwordOrError
                ]);
                if (combinedResult.isFailure) {
                    return Result_1.left(new AppError_1.AppError.InputError(combinedResult.error.toString()));
                }
                ;
                //#endregion
                //#region - If dto is valid, fetch user by email
                const user = yield this.userRepo.getUserByEmail(dto.email);
                const userNotFound = !user;
                if (userNotFound) {
                    return Result_1.left(new LoginUserErrors_1.UserDoesNotExist());
                }
                //#endregion
                //#region - Compare passwords
                const passwordsMatch = user.password.comparePassword(dto.password, user.password.value);
                if (!passwordsMatch) {
                    return Result_1.left(new LoginUserErrors_1.PasswordDoesntMatch());
                }
                //#endregion
                //#region - Sign jwt
                const authTokens = this.authService.signJwt({
                    userId: user.userId.id.toString(),
                    email: user.email.value,
                    username: ((_a = user.username) === null || _a === void 0 ? void 0 : _a.value) || ''
                });
                //#endregion
                return Result_1.right(Result_1.Result.ok(authTokens));
            }
            catch (error) {
                console.log(error);
                return Result_1.left(new AppError_1.AppError.UnexpectedError());
            }
        });
    }
}
exports.LoginUser = LoginUser;
