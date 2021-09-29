"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
// @ts-nocheck
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../../config");
class AuthService {
    /**
     * @description Verifies a JWT token
     */
    decodeJwt(token, tokenType) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, tokenType === 'access' ?
                config_1.config.auth.jwtSecret :
                config_1.config.auth.refreshTokenSecret);
            return decodedToken;
        }
        catch (error) {
            return undefined;
        }
    }
    refreshAuthToken() {
    }
    signJwt(jwtClaims) {
        const accessToken = jsonwebtoken_1.default.sign(jwtClaims, config_1.config.auth.jwtSecret);
        const refreshToken = jsonwebtoken_1.default.sign(jwtClaims, config_1.config.auth.refreshTokenSecret);
        return {
            accessToken,
            refreshToken
        };
    }
}
exports.AuthService = AuthService;
const authService = new AuthService();
exports.authService = authService;
