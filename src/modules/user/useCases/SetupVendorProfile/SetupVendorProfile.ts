 import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, right, Result } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { UserPassword } from "../../domain/userPassword";
import { IUserRepo } from "../../repo/userRepo";
import { IVendorSignupRequestRepo } from "../../repo/vendorSignupRequestRepo";
import CreateUser from "../CreateUser/CreateUser";
import { CreateUserDTO } from "../CreateUser/CreateUserDTO";
import { CreateVendor } from "../createVendor/CreateVendor";
import { SetupVendorProfileDTO } from "./SetupVendorProfileDTO";
import * as SetupVendorProfileErrors from "./SetupVendorProfileErrors";

type SetupVendorProfileResult = Either<
    Result<void>,
    | AppError.InputError
    | AppError.UnexpectedError
    | SetupVendorProfileErrors.VendorSignupRequestNotFound
>

export class SetupVendorProfile implements UseCase<SetupVendorProfileDTO, SetupVendorProfileResult> {
    constructor(
        private createUserUseCase: CreateUser,
        private createVendorUseCase: CreateVendor,
        private vendorSignupRequestRepo: IVendorSignupRequestRepo,
        private userRepo: IUserRepo
    ) {}

    async execute(dto: SetupVendorProfileDTO): Promise<any> {
        try {
            //#region - Make sure the vendorSignupRequestId is defined
            const guardResult = Guard.againstNullOrUndefined(dto.vendorSignupRequestId, 'vendorSignupRequestId')
            if (!guardResult.succeeded) {
                return left(new AppError.InputError(guardResult.message as string));
            }
            //#endregion
    
            //#region - Verify that the vendorSignupRequestId matches an entry in the DB
            const vendorSignupRequest = await this.vendorSignupRequestRepo.getVendorSignupRequestById(dto.vendorSignupRequestId);
            if (!vendorSignupRequest) {
                return left(
                    new SetupVendorProfileErrors.VendorSignupRequestNotFound(dto.vendorSignupRequestId)
                )
            }
            //#endregion
    
            //#region - Check if a user exists with the email in the vendorSignupRequest
            const userExistsWithVendorEmail = await this.userRepo.exists(vendorSignupRequest.vendorEmail)
            const userPasswordSupplied = dto.userPassword
            let passwordOrError = {} as Result<UserPassword>;
            if (!userExistsWithVendorEmail && !userPasswordSupplied) {
                return left(
                    new SetupVendorProfileErrors.UserDoesntExistWithVendorEmail()
                )
            } else if (!userExistsWithVendorEmail && userPasswordSupplied) {
                // Create the user here
                passwordOrError = UserPassword.create({ value: userPasswordSupplied });
                if (passwordOrError.isFailure) {
                    return left(
                        new SetupVendorProfileErrors.UserPasswordInvalid(passwordOrError.errorValue().toString())
                    );
                }
                
            }
            await this.createUser({
                email: vendorSignupRequest.vendorEmail.value,
                password: passwordOrError.getValue().value
            })
            //#endregion 
            
            //#region - Create the vendor
            //#endregion 
    
            //#region - Create the restaurant
            //#endregion             
        } catch (error) {
            return left(
                new AppError.UnexpectedError()
            )
        }

    }

    private getUserByVendorEmail() {

    }

    async createUser(userDto: CreateUserDTO) {
        const result = await this.createUserUseCase.execute(userDto);
        if (result.isRight()) {
            this.createVendor(userDto.email)
        }
    }
    
    async createVendor(userEmail: string) {
        const user = await this.userRepo.getUserByEmail(userEmail);
        if (!user) throw new Error("Can't fetch user after creation")
        
        const result = await this.createVendorUseCase.execute({
            userId: user.userId.id.toString()
        });
        if (result.isRight()) {
            this.createRestaurant('')
        }
    }

    createRestaurant(restaurantDto: any) {}
}