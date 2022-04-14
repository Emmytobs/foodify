import UseCase from "../../../../shared/core/UseCase";
import { CreateUserDTO } from "./CreateUserDTO"; 
import {
    EmailAlreadyTakenError,
    UsernameAlreadyTakenError,
    UserPasswordInvalidError
} from './CreateUserErrors'
import { Either, left, Result, right } from '../../../../shared/core/Result'
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";
import { AppError } from "../../../../shared/core/AppError";
import { IUserRepo } from "../../repo/userRepo";
import { User } from "../../domain/user";
import { UserName } from "../../domain/userName";
import { UserRoles } from "../../domain/userRoles";

type CreateUserResult = Either<
    Result<void>,
    | EmailAlreadyTakenError
    | UsernameAlreadyTakenError
    | UserPasswordInvalidError
    | AppError.InputError
    | AppError.UnexpectedError
    | Result<any>
>

class CreateUser implements UseCase<CreateUserDTO, CreateUserResult> {

    constructor(
        private userRepo: IUserRepo
    ) {}

    async execute(dto: CreateUserDTO): Promise<CreateUserResult> {
        // Write your implementation to execute the use case
        const emailOrError = UserEmail.create({ value: dto.email });
        const passwordOrError = UserPassword.create({ value: dto.password });
        const usernameOrError = UserName.create({ value: dto.username as string });
        
        let combinedResult: Result<any>; 

        try {
            if (dto.username) {
                combinedResult = Result.combine([emailOrError, passwordOrError, usernameOrError]);
            } else {
                combinedResult = Result.combine([emailOrError, passwordOrError]);
            }
    
            if (combinedResult.isFailure) {
                return left(new AppError.InputError(combinedResult.error))
            }
    
            // #region 
            const email = emailOrError.getValue()
            const password = passwordOrError.getValue()
            const username = dto.username ? usernameOrError.getValue() : null;
            
            const userExistsWithEmail = await this.userRepo.exists(email);
            if (userExistsWithEmail) {
                return left(new EmailAlreadyTakenError());
            }
            if (dto.username && username?.value) {
                const userExistsWithUsername = await this.userRepo.getUserByUserName(username.value);
                if (userExistsWithUsername) {
                    return left(new UsernameAlreadyTakenError())
                }
            }
            // #endregion
    
            const userOrError = User.create({
                email,
                password,
                username: username?.value ? username : undefined,
                roles: UserRoles.create(
                    { value: ['Customer'] }
                ).getValue()
            });
    
            if (userOrError.isFailure) {
                return left(
                    Result.fail(userOrError.errorValue().toString())
                )
            }
    
            await this.userRepo.save(userOrError.getValue())
    
            return right(Result.ok<void>())
        } catch (error) {
            console.log(error)
            return left(new AppError.UnexpectedError())
        }
    }

}

export default CreateUser