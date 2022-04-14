import UseCase from '../../../../shared/core/UseCase'
import { Result, Either, left, right } from "../../../../shared/core/Result"
import { IUserRepo } from '../../repo/userRepo'
import { VerifyVendorSignedUpDTO } from './VerifyVendorSignedUpDTO'
import { AppError } from '../../../../shared/core/AppError'

type VerifyVendorSignedUpResult = Either<
    Result<boolean>,
    | AppError.UnexpectedError
>

export class VerifyVendorSignedUp implements UseCase<VerifyVendorSignedUpDTO, VerifyVendorSignedUpResult> {
    constructor(private userRepo: IUserRepo) {}

    async execute(dto: VerifyVendorSignedUpDTO): Promise<VerifyVendorSignedUpResult> {
        try {
            // Get user by vendor signup request email
            const userExistsWithVendorEmail = await this.userRepo.getUserByEmail(dto.vendorSignupRequestEmail)
            if (userExistsWithVendorEmail) {
                return right(Result.ok<boolean>(true))
            }
            return right(Result.ok<boolean>(false))

        } catch (error) {
            return left(
                new AppError.UnexpectedError()
            )
        }
    }
}