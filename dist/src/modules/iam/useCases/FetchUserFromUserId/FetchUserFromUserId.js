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
exports.FetchUserFromUserId = void 0;
const AppError_1 = require("../../../../shared/core/AppError");
const Result_1 = require("../../../../shared/core/Result");
const FetchUserFromUserIdErrors_1 = require("./FetchUserFromUserIdErrors");
class FetchUserFromUserId {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepo.getUserByUserId(dto.userId);
                if (user) {
                    return Result_1.right(Result_1.Result.ok(user));
                }
                else {
                    return Result_1.left(new FetchUserFromUserIdErrors_1.UserNotFoundError());
                }
            }
            catch (error) {
                return Result_1.left(new AppError_1.AppError.UnexpectedError());
            }
        });
    }
}
exports.FetchUserFromUserId = FetchUserFromUserId;
