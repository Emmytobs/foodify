// import { sequelize } from "../../../shared/infra/database/sequelize/models";

import SequelizeUserRepo from "./implementation/SequelizeUserRepo"
import SequelizeVendorSignupRequestRepo from "../../user/repo/implementation/SequelizeVendorSignupRequestRepo";

import { UserModel } from "../../../shared/infra/database/sequelize/models/UserModel";
import { VendorSignupRequestModel } from "../../../shared/infra/database/sequelize/models/VendorSignupRequestModel";
import { VendorModel } from "../../../shared/infra/database/sequelize/models/VendorModel";
import { SequelizeVendorRepo } from "./implementation/SequelizeVendorRepo";

const sequelizeUserRepo = new SequelizeUserRepo({ UserModel });
const sequelizeVendorRepo = new SequelizeVendorRepo({ VendorModel });
const sequelizeVendorSignupRequestRepo = new SequelizeVendorSignupRequestRepo({ VendorSignupRequestModel })

export {
    sequelizeUserRepo,
    sequelizeVendorRepo,
    sequelizeVendorSignupRequestRepo,
}