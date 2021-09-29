import { AppError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { UserEmail } from "../../../user/domain/userEmail";
import { VendorSignupRequest } from "../../domain/vendorSignupRequest";
import { IVendorSignupRequestRepo } from "../../repo/vendorSignupRequestRepo";
import { CreateVendorSignupRequestDTO } from "./CreateVendorSignupRequestDTO";

type CreateVendorSignupRequestResult = Either<
    Result<void>,
    | AppError.InputError
    | AppError.UnexpectedError
>;

export class CreateVendorSignupRequest implements UseCase<CreateVendorSignupRequestDTO, CreateVendorSignupRequestResult> {

    constructor(
        private vendorSignupRequestRepo: IVendorSignupRequestRepo
    ) {}

    async execute(dto: CreateVendorSignupRequestDTO): Promise<CreateVendorSignupRequestResult> {
        try {
            const userEmailOrError = UserEmail.create({ value: dto.vendorEmail });
            if (userEmailOrError.isFailure) {
                return left(
                    new AppError.InputError(userEmailOrError.errorValue().toString())
                )
            }
            
            const vendorSignupRequestOrError = VendorSignupRequest.create({
                ...dto,
                vendorEmail: userEmailOrError.getValue()
            });
            if (vendorSignupRequestOrError.isFailure) {
                return left(
                    new AppError.InputError(vendorSignupRequestOrError.errorValue().toString())
                )
            }

            await this.vendorSignupRequestRepo.save(vendorSignupRequestOrError.getValue())
            
            return right(Result.ok<void>())
        } catch (error) {
            return left(new AppError.UnexpectedError())
        }
    }
}