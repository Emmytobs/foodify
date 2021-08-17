"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var AuthService_1 = require("../../../../modules/iam/services/implementation/AuthService");
var AuthMiddleware_1 = require("./AuthMiddleware");
var authMiddleware = new AuthMiddleware_1.AuthMiddleware(AuthService_1.authService);
exports.authMiddleware = authMiddleware;
