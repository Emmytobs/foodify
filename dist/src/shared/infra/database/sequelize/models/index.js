"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const dotenv_1 = __importDefault(require("dotenv"));
// import * as DBconfig from '../config'
const DBconfig = __importStar(require("../config"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'development';
const config = DBconfig[env];
let sequelize;
exports.sequelize = sequelize;
if (config.database_uri) {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(config.database_uri, config);
}
else {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(config);
}
(function testDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log(`Database connected successfully in ${env}`);
        }
        catch (error) {
            console.log('Database connection failed');
            console.log(error);
        }
    });
})();
// import fs from 'fs'
// import { sequelize } from "../config";
// // turns base_user => BaseUser
// function toCamelCase (str: string): string {
//   const _ = str.indexOf("_");
//   if (~_) {
//     return toCamelCase(str.substring(0, _) 
//         + str.substring(_ + 1)
//           .substring(0, 1)
//           .toUpperCase() 
//         + str.substring(_ + 2)
//     )
//   }
//   else {
//     return str.substring(0, 1).toUpperCase() + str.substring(1);
//   }
// }
// let models: any = {};
// let modelsLoaded = false;
// const createModels = () => {
//   if (modelsLoaded) return models;
//   // Get all models
//   const modelsList = fs.readdirSync(path.resolve(__dirname, "./"))
//     .filter((t) => (~t.indexOf('.ts') || ~t.indexOf('.js')) && !~t.indexOf("index") && !~t.indexOf(".map"))
//     .map((model) => sequelize.import(__dirname + '/' + model))
//   // Camel case the models
//   for (let i = 0; i < modelsList.length; i++) {
//     const modelName = toCamelCase(modelsList[i].name);
//     models[modelName] = modelsList[i];
//   }
//   // Create the relationships for the models;
//   Object.keys(models).forEach((modelName) => {
//     if (models[modelName].associate) {
//       models[modelName].associate(models);
//     }
//   });
//   models['sequelize'] = sequelize;
//   models['Sequelize'] = Sequelize;
//   modelsLoaded = true;
//   return models;
// }
// export default createModels();
// export {
//   createModels
// }
