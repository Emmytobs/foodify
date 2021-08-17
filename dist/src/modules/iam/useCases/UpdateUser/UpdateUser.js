"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UpdateUser = void 0;
var AppError_1 = require("../../../../shared/core/AppError");
var Guard_1 = require("../../../../shared/core/Guard");
var Result_1 = require("../../../../shared/core/Result");
var UpdateUserErrors = __importStar(require("./UpdateUserErrors"));
var UpdateUser = /** @class */ (function () {
    function UpdateUser(userRepo) {
        this.userRepo = userRepo;
        this.updates = [];
    }
    UpdateUser.prototype.addUpdate = function (update) {
        this.updates.push(update);
    };
    UpdateUser.prototype.getCombinedUpdates = function () {
        return Result_1.Result.combine(this.updates);
    };
    UpdateUser.prototype.execute = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, validPropertiesToUpdate, _a, firstname, lastname, password, username, user, userExists, fieldsToUpdate, guardCollection, guardResult, combinedUpdatesResult, savedUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        userId = dto.userId;
                        validPropertiesToUpdate = Object.keys({
                            firstname: '',
                            lastname: '',
                            username: '',
                            password: '',
                        });
                        _a = dto.fieldsToUpdate, firstname = _a.firstname, lastname = _a.lastname, password = _a.password, username = _a.username;
                        return [4 /*yield*/, this.userRepo.getUserByUserId(userId)];
                    case 1:
                        user = _b.sent();
                        userExists = !!user;
                        if (!userExists) {
                            return [2 /*return*/, Result_1.left(new UpdateUserErrors.UserNotFoundError(userId))];
                        }
                        fieldsToUpdate = Object.keys(dto.fieldsToUpdate);
                        guardCollection = fieldsToUpdate.map(function (fieldName) { return ({
                            argument: dto.fieldsToUpdate[fieldName],
                            argumentName: fieldName
                        }); });
                        guardResult = Guard_1.Guard.areOneOf(validPropertiesToUpdate, guardCollection);
                        if (!guardResult.succeeded) {
                            return [2 /*return*/, Result_1.left(new UpdateUserErrors.PropertyToUpdateIsInvalid(guardResult.message || ''))];
                        }
                        //#endregion
                        //#region - Update the individual properties of the user
                        if (firstname) {
                            this.addUpdate(user.updateFirstname(firstname));
                        }
                        if (lastname) {
                            this.addUpdate(user.updateLastname(lastname));
                        }
                        if (username) {
                            this.addUpdate(user.updateUsername(username));
                        }
                        if (password) {
                            this.addUpdate(user.updatePassword(password));
                        }
                        combinedUpdatesResult = this.getCombinedUpdates();
                        if (combinedUpdatesResult.isFailure) {
                            return [2 /*return*/, Result_1.left(new AppError_1.AppError.InputError(combinedUpdatesResult.errorValue().toString()))];
                        }
                        //#endregion
                        //#region - Save the updated user
                        return [4 /*yield*/, this.userRepo.save(user)];
                    case 2:
                        //#endregion
                        //#region - Save the updated user
                        _b.sent();
                        return [4 /*yield*/, this.userRepo.getUserByUserId(userId)];
                    case 3:
                        savedUser = _b.sent();
                        if (!savedUser)
                            throw new Error('Exception: Could not fetch user after saving');
                        return [2 /*return*/, Result_1.right(Result_1.Result.ok(savedUser))];
                    case 4:
                        error_1 = _b.sent();
                        return [2 /*return*/, Result_1.left(new AppError_1.AppError.UnexpectedError())];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateUser;
}());
exports.UpdateUser = UpdateUser;
