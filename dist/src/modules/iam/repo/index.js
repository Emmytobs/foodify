"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
var SequelizeUserRepo_1 = __importDefault(require("./implementation/SequelizeUserRepo"));
var userRepo = new SequelizeUserRepo_1.default(''); // Insert sequelize models
exports.userRepo = userRepo;
