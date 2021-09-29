"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = void 0;
const repo_1 = require("../../repo");
const UpdateUser_1 = require("./UpdateUser");
const UpdateUserController_1 = require("./UpdateUserController");
const updateUserUseCase = new UpdateUser_1.UpdateUser(repo_1.sequelizeUserRepo);
const updateUserController = new UpdateUserController_1.UpdateUserController(updateUserUseCase);
exports.updateUserController = updateUserController;
