"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
var SequelizeUserRepo_1 = __importDefault(require("../../repo/implementation/SequelizeUserRepo"));
var CreateUser_1 = __importDefault(require("./CreateUser"));
var CreateUserController_1 = require("./CreateUserController");
var createUserUseCase = new CreateUser_1.default(new SequelizeUserRepo_1.default(''));
var createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
exports.createUserController = createUserController;
