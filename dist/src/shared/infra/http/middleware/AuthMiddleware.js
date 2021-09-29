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
exports.AuthMiddleware = void 0;
const FetchUserFromUserId_1 = require("../../../../modules/iam/useCases/FetchUserFromUserId");
const FetchUserFromUserIdErrors_1 = require("../../../../modules/iam/useCases/FetchUserFromUserId/FetchUserFromUserIdErrors");
const AppError_1 = require("../../../core/AppError");
class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    endRequest(res, message, statusCode) {
        res.status(statusCode).json(message);
    }
    getJWTFromAuthHeader(authHeaderValue) {
        return authHeaderValue.split(' ')[1];
    }
    authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = this.getJWTFromAuthHeader(req.headers['authorization'] || '');
            if (!authToken) {
                return this.endRequest(res, 'No auth token provided', 401);
            }
            const decoded = this.authService.decodeJwt(authToken, 'access');
            if (!decoded) {
                return this.endRequest(res, 'Token signature expired', 401);
            }
            const result = yield FetchUserFromUserId_1.fetchUserFromUserId.execute(decoded);
            if (result.isRight()) {
                return next();
            }
            const errorClass = result.value;
            switch (errorClass.constructor) {
                case FetchUserFromUserIdErrors_1.UserNotFoundError:
                    this.endRequest(res, errorClass.getValue().toString(), 404);
                case AppError_1.AppError.UnexpectedError:
                    this.endRequest(res, 'Error authenticating', 500);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
