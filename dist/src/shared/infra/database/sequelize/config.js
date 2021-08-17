"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = exports.test = exports.development = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var development = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: 'postgres'
};
exports.development = development;
var test = {
    username: "root",
    password: undefined,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
};
exports.test = test;
var production = {
    database_uri: 'DATABASE_URL',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
};
exports.production = production;
// const DBconfig = { development, test, production };
// const env = process.env.NODE_ENV as NodeEnvs || 'development' 
// const config = DBconfig[env]
// let sequelize: Sequelize
// if (config.database_uri) {
//     sequelize = new Sequelize(config.database_uri);
// } else {
//     sequelize = new Sequelize(config)
// }
// export {
//     sequelize,
//     Sequelize
// }
