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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const AppError_1 = require("../../../../shared/core/AppError");
const Guard_1 = require("../../../../shared/core/Guard");
const Result_1 = require("../../../../shared/core/Result");
const UpdateUserErrors = __importStar(require("./UpdateUserErrors"));
class UpdateUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.updates = [];
    }
    addUpdate(update) {
        this.updates.push(update);
    }
    getCombinedUpdates() {
        return Result_1.Result.combine(this.updates);
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = dto;
                const validPropertiesToUpdate = Object.keys({
                    firstname: '',
                    lastname: '',
                    username: '',
                    password: '',
                });
                const { firstname, lastname, password, username, } = dto.fieldsToUpdate;
                //#region - Return an error if the user doesn't exist in the database
                const user = yield this.userRepo.getUserByUserId(userId);
                const userExists = !!user;
                if (!userExists) {
                    return Result_1.left(new UpdateUserErrors.UserNotFoundError(userId));
                }
                //#endregion
                const fieldsToUpdate = Object.keys(dto.fieldsToUpdate);
                //#region - Ensure the fields being sent are valid update-able properties of the user model
                const guardCollection = fieldsToUpdate.map((fieldName) => ({
                    argument: dto.fieldsToUpdate[fieldName],
                    argumentName: fieldName
                }));
                const guardResult = Guard_1.Guard.areOneOf(validPropertiesToUpdate, guardCollection);
                if (!guardResult.succeeded) {
                    return Result_1.left(new UpdateUserErrors.PropertyToUpdateIsInvalid(guardResult.message || ''));
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
                const combinedUpdatesResult = this.getCombinedUpdates();
                if (combinedUpdatesResult.isFailure) {
                    return Result_1.left(new AppError_1.AppError.InputError(combinedUpdatesResult.errorValue().toString()));
                }
                //#endregion
                //#region - Save the updated user
                yield this.userRepo.save(user);
                const savedUser = yield this.userRepo.getUserByUserId(userId);
                if (!savedUser)
                    throw new Error('Exception: Could not fetch user after saving');
                return Result_1.right(Result_1.Result.ok(savedUser));
                //#endregion 
            }
            catch (error) {
                return Result_1.left(new AppError_1.AppError.UnexpectedError());
            }
        });
    }
}
exports.UpdateUser = UpdateUser;
