import { VendorAttr } from "../../../shared/infra/database/sequelize/models/VendorModel";
import { Vendor } from "../domain/vendor";

export class VendorMap {
    public static toDomain(vendor: any): Vendor {
        const vendorOrError = Vendor.create({ userId: vendor.userId });
        if (vendorOrError.isFailure) {
            throw new Error(vendorOrError.errorValue().toString());
        }
        return vendorOrError.getValue();
    }

    public static toPersistence(vendor: Vendor): VendorAttr {
        return {
            vendorId: vendor.vendorId.id.toString(),
            userId: vendor.userId.id.toString()
        }
    }
}