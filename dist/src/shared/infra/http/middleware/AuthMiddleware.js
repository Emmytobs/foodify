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
exports.AuthMiddleware = void 0;
var FetchUserFromUserId_1 = require("../../../../modules/iam/useCases/FetchUserFromUserId");
var FetchUserFromUserIdErrors_1 = require("../../../../modules/iam/useCases/FetchUserFromUserId/FetchUserFromUserIdErrors");
var AppError_1 = require("../../../core/AppError");
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware(authService) {
        this.authService = authService;
    }
    AuthMiddleware.prototype.endRequest = function (res, message, statusCode) {
        res.status(statusCode).json(message);
    };
    AuthMiddleware.prototype.getJWTFromAuthHeader = function (authHeaderValue) {
        return authHeaderValue.split(' ')[1];
    };
    AuthMiddleware.prototype.authenticate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var authToken, decoded, result, errorClass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = this.getJWTFromAuthHeader(req.headers['authorization'] || '');
                        if (!authToken) {
                            return [2 /*return*/, this.endRequest(res, 'No auth token provided', 401)];
                        }
                        decoded = this.authService.decodeJwt(authToken, 'access');
                        if (!decoded) {
                            return [2 /*return*/, this.endRequest(res, 'Token signature expired', 401)];
                        }
                        return [4 /*yield*/, FetchUserFromUserId_1.fetchUserFromUserId.execute(decoded)];
                    case 1:
                        result = _a.sent();
                        if (result.isRight()) {
                            return [2 /*return*/, next()];
                        }
                        errorClass = result.value;
                        switch (errorClass.constructor) {
                            case FetchUserFromUserIdErrors_1.UserNotFoundError:
                                this.endRequest(res, errorClass.getValue().toString(), 404);
                            case AppError_1.AppError.UnexpectedError:
                                this.endRequest(res, 'Error authenticating', 500);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
