import { Options, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// import * as DBconfig from '../config'
import * as DBconfig from '../config'

type NodeEnvs = 'development' | 'test' | 'production'

dotenv.config()

const env = process.env.NODE_ENV as NodeEnvs || 'development' 
const config: any = DBconfig[env]

let sequelize: Sequelize

if (config.database_uri) {
    sequelize = new Sequelize(config.database_uri, config);
} else {
    sequelize = new Sequelize(config)
}

(async function testDBConnection() {
    try {
        await sequelize.authenticate()
        console.log(`Database connected successfully in ${env}`)
    } catch (error) {
        console.log('Database connection failed')
        console.log(error)
    }
})()


export {
    sequelize,
    Sequelize
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