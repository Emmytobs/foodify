"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
// @ts-nocheck
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../../../../config");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    /**
     * @description Verifies a JWT token
     */
    AuthService.prototype.decodeJwt = function (token, tokenType) {
        try {
            var decodedToken = jsonwebtoken_1.default.verify(token, tokenType === 'access' ?
                config_1.config.auth.jwtSecret :
                config_1.config.auth.refreshTokenSecret);
            return decodedToken;
        }
        catch (error) {
            return undefined;
        }
    };
    AuthService.prototype.refreshAuthToken = function () {
    };
    AuthService.prototype.signJwt = function (jwtClaims) {
        var accessToken = jsonwebtoken_1.default.sign(jwtClaims, config_1.config.auth.jwtSecret);
        var refreshToken = jsonwebtoken_1.default.sign(jwtClaims, config_1.config.auth.refreshTokenSecret);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    };
    return AuthService;
}());
exports.AuthService = AuthService;
var authService = new AuthService();
exports.authService = authService;
