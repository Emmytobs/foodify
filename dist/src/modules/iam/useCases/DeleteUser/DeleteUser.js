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
exports.DeleteUser = void 0;
const AppError_1 = require("../../../../shared/core/AppError");
const Nil_1 = require("../../../../shared/core/Nil");
const Result_1 = require("../../../../shared/core/Result");
const DeleteUserErrors = __importStar(require("./DeleteUserErrors"));
class DeleteUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = dto;
                //#region - Return an error if no user id is passed in
                const userIdNotPassedIn = Nil_1.isNil(userId);
                if (userIdNotPassedIn) {
                    return Result_1.left(new DeleteUserErrors.UserIdNotProvided());
                }
                // const guardResult = Guard.againstNullOrUndefined(dto.userId, 'userId');
                // if (!guardResult.succeeded) {
                //     return left(new DeleteUserErrors.UserIdNotProvided());
                // }
                //#endregion
                //#region - Return an error if the user does not exist
                const user = yield this.userRepo.getUserByUserId(userId);
                if (!user) {
                    return Result_1.left(new DeleteUserErrors.UserNotFoundError(userId));
                }
                //#endregion 
                //#region - If the user exists, delete the user
                yield this.userRepo.delete(user.userId);
                return Result_1.right(Result_1.Result.ok());
                //#endregion 
            }
            catch (error) {
                return Result_1.left(new AppError_1.AppError.UnexpectedError());
            }
        });
    }
}
exports.DeleteUser = DeleteUser;
