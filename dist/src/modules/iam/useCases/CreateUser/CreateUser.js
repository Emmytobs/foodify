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
// import { CreateUserResult, CreateUserSuccess } from "./CreateUserResult";    
var CreateUserErrors_1 = require("./CreateUserErrors");
var Result_1 = require("../../../../shared/core/Result");
var userEmail_1 = require("../../domain/userEmail");
var userPassword_1 = require("../../domain/userPassword");
var AppError_1 = require("../../../../shared/core/AppError");
var user_1 = require("../../domain/user");
var userName_1 = require("../../domain/userName");
var userRoles_1 = require("../../domain/userRoles");
var CreateUser = /** @class */ (function () {
    function CreateUser(userRepo) {
        this.userRepo = userRepo;
    }
    CreateUser.prototype.execute = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var emailOrError, passwordOrError, usernameOrError, combinedResult, email, password, username, userExistsWithEmail, userExistsWithUsername, userOrError, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailOrError = userEmail_1.UserEmail.create({ value: dto.email });
                        passwordOrError = userPassword_1.UserPassword.create({ value: dto.password });
                        usernameOrError = userName_1.UserName.create({ value: dto.username });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (dto.username) {
                            combinedResult = Result_1.Result.combine([emailOrError, passwordOrError, usernameOrError]);
                        }
                        else {
                            combinedResult = Result_1.Result.combine([emailOrError, passwordOrError]);
                        }
                        if (combinedResult.isFailure) {
                            return [2 /*return*/, Result_1.left(new AppError_1.AppError.InputError(combinedResult.error))];
                        }
                        email = emailOrError.getValue();
                        password = passwordOrError.getValue();
                        username = usernameOrError.getValue();
                        return [4 /*yield*/, this.userRepo.exists(email)];
                    case 2:
                        userExistsWithEmail = _a.sent();
                        if (userExistsWithEmail) {
                            return [2 /*return*/, Result_1.left(new CreateUserErrors_1.EmailAlreadyTakenError())];
                        }
                        if (!username.value) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userRepo.getUserByUserName(username.value)];
                    case 3:
                        userExistsWithUsername = _a.sent();
                        if (userExistsWithUsername) {
                            return [2 /*return*/, Result_1.left(new CreateUserErrors_1.UsernameAlreadyTakenError())];
                        }
                        _a.label = 4;
                    case 4:
                        userOrError = user_1.User.create({
                            email: email,
                            password: password,
                            username: username.value ? username : undefined,
                            roles: userRoles_1.UserRoles.create({ value: ['Customer'] }).getValue()
                        });
                        if (userOrError.isFailure) {
                            return [2 /*return*/, Result_1.left(Result_1.Result.fail(userOrError.errorValue().toString()))];
                        }
                        return [4 /*yield*/, this.userRepo.save(userOrError.getValue())];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, Result_1.right(Result_1.Result.ok())];
                    case 6:
                        error_1 = _a.sent();
                        return [2 /*return*/, Result_1.left(new AppError_1.AppError.UnexpectedError())];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return CreateUser;
}());
exports.default = CreateUser;
