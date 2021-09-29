"use strict";
const dotEnv = require('dotenv');
dotEnv.config();
// type DBConnectionOptions = Options & {
//     database_uri?: string
// }
const development = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: 'postgres'
};
const test = {
    username: "root",
    password: undefined,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
};
const production = {
    database_uri: 'DATABASE_URL',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
};
module.exports = {
    development,
    test,
    production
};
