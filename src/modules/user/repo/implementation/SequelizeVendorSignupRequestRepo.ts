import { VendorSignupRequestModel } from "../../../../shared/infra/database/sequelize/models/VendorSignupRequestModel";
import { VendorSignupRequest } from "../../domain/vendorSignupRequest";
import { VendorSignupRequestMap } from "../../mappers/VendorSignupRequestMap";
import { IVendorSignupRequestRepo } from "../vendorSignupRequestRepo";

interface SequelizeVendorSignupRequestRepoModels {
    VendorSignupRequestModel: typeof VendorSignupRequestModel
}

export default class SequelizeVendorSignupRequestRepo implements IVendorSignupRequestRepo {

    constructor(
        private models: SequelizeVendorSignupRequestRepoModels
    ) {}

    async exists(id: string): Promise<boolean> {
        // Check if vendor signup request already exists
        return false;
    }

    async getVendorSignupRequestById(id: string): Promise<VendorSignupRequest | null> {
        const rawVendorSignupRequest = await this.models.VendorSignupRequestModel.findOne({
            where: { vendorSignupRequestId: id }
        });

        if (!rawVendorSignupRequest) return null;
        return VendorSignupRequestMap.toDomain(rawVendorSignupRequest)
    }

    async save(vendorSignupRequest: VendorSignupRequest) {
        const rawVendorSignupRequest = VendorSignupRequestMap.toPersistence(vendorSignupRequest);
        const vendorSignupRequestExists = await this.exists(rawVendorSignupRequest.vendorSignupRequestId)
        if (vendorSignupRequestExists) {
            // Perform update logic here
            return;
        }

        await this.models.VendorSignupRequestModel.create(rawVendorSignupRequest);
    }
}