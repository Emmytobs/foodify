import { sequelize } from "../../../shared/infra/database/sequelize/models";
import { VendorSignupRequestModel } from "../../../shared/infra/database/sequelize/models/VendorSignupRequestModel";

import SequelizeVendorSignupRequestRepo from "../../user/repo/implementation/SequelizeVendorSignupRequestRepo";

const sequelizeVendorSignupRequestRepo = new SequelizeVendorSignupRequestRepo({
    VendorSignupRequestModel
})

export {
    sequelizeVendorSignupRequestRepo
}