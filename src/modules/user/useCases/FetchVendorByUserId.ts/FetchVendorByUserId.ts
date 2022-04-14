import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { Vendor } from "../../domain/vendor";
import { IVendorRepo } from "../../repo/vendorRepo";
import { FetchVendorByUserIdDTO } from "./FetchVendorByUserIdDTO";

type FetchVendorByUserIdResult = Result<Vendor | null>

export class FetchVendorByUserId implements UseCase<FetchVendorByUserIdDTO, FetchVendorByUserIdResult> {

    constructor(
        private vendorRepo: IVendorRepo
    ) {}

    async execute(dto: FetchVendorByUserIdDTO) {
        try {
            const guardResult = Guard.againstNullOrUndefined(dto.associatedUserId, "User id")
            if (!guardResult.succeeded) {
                throw new Error(guardResult.message)
            }

            const vendor = await this.vendorRepo.getVendorByUserId(dto.associatedUserId)
            return Result.ok(vendor)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}