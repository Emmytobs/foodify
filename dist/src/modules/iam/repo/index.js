"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeUserRepo = void 0;
const SequelizeUserRepo_1 = __importDefault(require("./implementation/SequelizeUserRepo"));
const UserModel_1 = require("../../../shared/infra/database/sequelize/models/UserModel");
// 
// const sequelizeUserRepo = new SequelizeUserRepo(sequelize.models); // Insert sequelize models
const sequelizeUserRepo = new SequelizeUserRepo_1.default({ UserModel: UserModel_1.UserModel }); // Insert sequelize models
exports.sequelizeUserRepo = sequelizeUserRepo;
