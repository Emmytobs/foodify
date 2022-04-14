import { CreateVendorSignupRequestController } from "./CreateVendorSignupRequestController";
import { CreateVendorSignupRequest } from "./CreateVendorSignupRequest";
import { sequelizeVendorSignupRequestRepo } from "../../repo";

const createVendorSignupRequest = new CreateVendorSignupRequest(sequelizeVendorSignupRequestRepo);
const createVendorSignupRequestController = new CreateVendorSignupRequestController(createVendorSignupRequest)

export {
    createVendorSignupRequestController
}