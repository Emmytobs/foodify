"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const repo_1 = require("../../repo");
const CreateUser_1 = __importDefault(require("./CreateUser"));
const CreateUserController_1 = require("./CreateUserController");
const createUserUseCase = new CreateUser_1.default(repo_1.sequelizeUserRepo);
const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
exports.createUserController = createUserController;
