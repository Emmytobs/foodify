"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AuthService_1 = require("../../../../modules/iam/services/implementation/AuthService");
const AuthMiddleware_1 = require("./AuthMiddleware");
const authMiddleware = new AuthMiddleware_1.AuthMiddleware(AuthService_1.authService);
exports.authMiddleware = authMiddleware;
