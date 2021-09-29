import { VendorModel } from "../../../../shared/infra/database/sequelize/models/VendorModel";
import { Vendor } from "../../domain/vendor";
import { VendorMap } from "../../mappers/vendorMap";
import { IVendorRepo } from "../vendorRepo";

interface SequelizeVendorRepoModels {
    VendorModel: typeof VendorModel
}

export class SequelizeVendorRepo implements IVendorRepo {

    constructor(
        private models: SequelizeVendorRepoModels
    ) {}

    async exists(vendorId: string): Promise<boolean> {
        const vendor = this.models.VendorModel.findOne({
            where: { vendorId }
        });
        return !!vendor;
    }

    async save(vendor: Vendor): Promise<void> {
        const rawVendor = VendorMap.toPersistence(vendor)
        const vendorExists = await this.exists(rawVendor.vendorId);
        if (vendorExists) {
            // Perform update logic
            await this.models.VendorModel.update(rawVendor, {
                // The first two options are to make the sequelize hooks run
                individualHooks: true,
                hooks: true,
                where: { vendorId: rawVendor.vendorId }
            })
            return;
        }
        await this.models.VendorModel.create(rawVendor)
    }
}