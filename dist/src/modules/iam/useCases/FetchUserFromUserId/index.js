"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserFromUserId = void 0;
const FetchUserFromUserId_1 = require("./FetchUserFromUserId");
const repo_1 = require("../../repo");
exports.fetchUserFromUserId = new FetchUserFromUserId_1.FetchUserFromUserId(repo_1.sequelizeUserRepo);
