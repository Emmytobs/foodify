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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var DBconfig = __importStar(require("../config"));
var env = process.env.NODE_ENV || 'development';
var config = DBconfig[env];
var sequelize;
exports.sequelize = sequelize;
if (config.database_uri) {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(config.database_uri, config);
}
else {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(config);
}
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
