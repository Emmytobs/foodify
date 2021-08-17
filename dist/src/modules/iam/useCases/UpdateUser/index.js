"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = void 0;
var repo_1 = require("../../repo");
var UpdateUser_1 = require("./UpdateUser");
var UpdateUserController_1 = require("./UpdateUserController");
var updateUserUseCase = new UpdateUser_1.UpdateUser(repo_1.userRepo);
var updateUserController = new UpdateUserController_1.UpdateUserController(updateUserUseCase);
exports.updateUserController = updateUserController;
