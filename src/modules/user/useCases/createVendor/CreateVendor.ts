import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { Vendor } from "../../domain/vendor";
import { IUserRepo } from "../../repo/userRepo";
import { IVendorRepo } from "../../repo/vendorRepo";
import { CreateVendorDTO } from "./CreateVendorDTO";
import * as CreateVendorErrors from "./CreateVendorErrors";


type CreateVendorResponse = Either<
    Result<void>,
    | AppError.InputError
    | AppError.UnexpectedError
    | Result<any>
>

export class CreateVendor implements UseCase<CreateVendorDTO, CreateVendorResponse> {
    constructor(
        private vendorRepo: IVendorRepo,
        private userRepo: IUserRepo
    ) {}

    async execute(dto: CreateVendorDTO): Promise<CreateVendorResponse> {
        try {
            //#region - Check if user id in dto is defined
            const guardResult = Guard.againstNullOrUndefined(dto.userId, 'userId');
            if (!guardResult.succeeded) {
                return left(
                    new CreateVendorErrors.UserIdNotSupplied()
                );
            }
            //#endregion

            //#region - Verify that user exists with userId
            const user = await this.userRepo.getUserByUserId(dto.userId);
            if (!user) {
                return left(
                    new CreateVendorErrors.UserWithUserIdNotFound(dto.userId)
                )
            }
            //#endregion

            const vendorOrError = Vendor.create({ userId: user.userId })
            if (vendorOrError.isFailure) {
                return left(
                    Result.fail(vendorOrError.errorValue().toString())
                )
            }

            const vendor = vendorOrError.getValue();
            await this.vendorRepo.save(vendor);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError())
        }
    }
}