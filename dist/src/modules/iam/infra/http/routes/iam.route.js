"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iamRoutes = void 0;
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const CreateUser_1 = require("../../../useCases/CreateUser");
const LoginUser_1 = require("../../../useCases/LoginUser");
const UpdateUser_1 = require("../../../useCases/UpdateUser");
exports.iamRoutes = express_1.default.Router();
exports.iamRoutes.post('/register', (req, res) => CreateUser_1.createUserController.execute(req, res));
exports.iamRoutes.post('/login', (req, res) => LoginUser_1.loginUserController.execute(req, res));
exports.iamRoutes.put('/', 
// Insert middleware here
(req, res) => UpdateUser_1.updateUserController.execute(req, res));
