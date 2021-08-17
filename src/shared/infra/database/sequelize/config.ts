import dotEnv from 'dotenv';
import { Options } from 'sequelize/types';
dotEnv.config();

type DBConnectionOptions = Options & {
    database_uri?: string
}

const development: DBConnectionOptions = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: 'postgres'
}

const test: DBConnectionOptions = {
    username: "root",
    password: undefined,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
}

const production: DBConnectionOptions = {
    database_uri: 'DATABASE_URL',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
};

export {
    development,
    test,
    production
}

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