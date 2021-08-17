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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
var AppError_1 = require("../../../../shared/core/AppError");
var Guard_1 = require("../../../../shared/core/Guard");
var Result_1 = require("../../../../shared/core/Result");
var userEmail_1 = require("../../domain/userEmail");
var userPassword_1 = require("../../domain/userPassword");
var LoginUserErrors_1 = require("./LoginUserErrors");
var LoginUser = /** @class */ (function () {
    function LoginUser(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    LoginUser.prototype.execute = function (dto) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guardResult, emailOrError, passwordOrError, combinedResult, user, userNotFound, passwordsMatch, authTokens, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
                            { argument: dto.email, argumentName: 'email' },
                            { argument: dto.password, argumentName: 'password' }
                        ]);
                        if (!guardResult.succeeded) {
                            return [2 /*return*/, Result_1.left(new AppError_1.AppError.InputError(guardResult.message || ''))];
                        }
                        emailOrError = userEmail_1.UserEmail.create({ value: dto.email });
                        passwordOrError = userPassword_1.UserPassword.create({ value: dto.password, hashed: false });
                        combinedResult = Result_1.Result.combine([emailOrError, passwordOrError
                        ]);
                        if (combinedResult.isFailure) {
                            return [2 /*return*/, Result_1.left(new AppError_1.AppError.InputError(combinedResult.error.toString()))];
                        }
                        ;
                        return [4 /*yield*/, this.userRepo.getUserByEmail(dto.email)];
                    case 1:
                        user = _b.sent();
                        userNotFound = !user;
                        if (userNotFound) {
                            return [2 /*return*/, Result_1.left(new LoginUserErrors_1.UserDoesNotExist())];
                        }
                        passwordsMatch = user.password.comparePassword(dto.password, user.password.value);
                        if (!passwordsMatch) {
                            return [2 /*return*/, Result_1.left(new LoginUserErrors_1.PasswordDoesntMatch())];
                        }
                        authTokens = this.authService.signJwt({
                            userId: user.userId.id.toString(),
                            email: user.email.value,
                            username: ((_a = user.username) === null || _a === void 0 ? void 0 : _a.value) || ''
                        });
                        //#endregion
                        return [2 /*return*/, Result_1.right(Result_1.Result.ok(authTokens))];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, Result_1.left(new AppError_1.AppError.UnexpectedError())];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LoginUser;
}());
exports.LoginUser = LoginUser;
