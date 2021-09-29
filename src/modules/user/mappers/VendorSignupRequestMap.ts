import { VendorSignupRequestAttr } from "../../../shared/infra/database/sequelize/models/VendorSignupRequestModel";
import { UserEmail } from "../domain/userEmail";
import { VendorSignupRequest } from "../domain/vendorSignupRequest";
import { VendorVerificationStatus } from "../domain/vendorVerificationStatus";

export class VendorSignupRequestMap {
    static toDomain(raw: any): VendorSignupRequest {
        const userEmailOrError = UserEmail.create({ value: raw.vendorEmail })

        const vendorSignupRequestOrError = VendorSignupRequest.create({
            vendorFirstname: raw.vendorFirstname,
            vendorLastname: raw.vendorLastname,
            vendorEmail: userEmailOrError.getValue(),
            restaurantName: raw.restaurantName,
            restaurantAddress: raw.restaurantAddress,
            restaurantCity: raw.restaurantCity,
            vendorVerificationStatus: raw.vendorVerificationStatus as VendorVerificationStatus
        });

        if (vendorSignupRequestOrError.isFailure) {
            throw new Error("Error: Could not map VendorSignupRequest to domain")
        }
        return vendorSignupRequestOrError.getValue()
    }

    static toPersistence(vendorSignupRequest: VendorSignupRequest): VendorSignupRequestAttr {
        return {
            vendorSignupRequestId: vendorSignupRequest.vendorSignupRequestId.id.toString(),
            vendorFirstname: vendorSignupRequest.vendorFirstname,
            vendorLastname: vendorSignupRequest.vendorLastname,
            vendorEmail: vendorSignupRequest.vendorEmail.value,
            restaurantName: vendorSignupRequest.restaurantName,
            restaurantAddress: vendorSignupRequest.restaurantAddress,
            restaurantCity: vendorSignupRequest.restaurantCity,
            vendorVerificationStatus: vendorSignupRequest.vendorVerificationStatus
        }
    }
}