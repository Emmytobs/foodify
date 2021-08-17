"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iamRoutes = void 0;
// @ts-nocheck
var express_1 = __importDefault(require("express"));
var CreateUser_1 = require("../../../useCases/CreateUser");
var LoginUser_1 = require("../../../useCases/LoginUser");
var UpdateUser_1 = require("../../../useCases/UpdateUser");
exports.iamRoutes = express_1.default.Router();
exports.iamRoutes.post('/', function (req, res) { return CreateUser_1.createUserController.execute(req, res); });
exports.iamRoutes.post('/login', function (req, res) { return LoginUser_1.loginUserController.execute(req, res); });
exports.iamRoutes.put('/', 
// Insert middleware here
function (req, res) { return UpdateUser_1.updateUserController.execute(req, res); });
