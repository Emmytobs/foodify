import SequelizeUserRepo from "./implementation/SequelizeUserRepo"
// import { sequelize } from "../../../shared/infra/database/sequelize/models";
import { UserModel } from "../../../shared/infra/database/sequelize/models/UserModel";

// const userRepo = new SequelizeUserRepo(sequelize.models); // Insert sequelize models
const userRepo = new SequelizeUserRepo({ UserModel }); // Insert sequelize models

export {
    userRepo
}