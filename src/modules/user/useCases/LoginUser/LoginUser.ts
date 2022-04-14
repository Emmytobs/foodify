import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { AuthTokens } from "../../domain/jwt";
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";
import { IUserRepo } from "../../repo/userRepo";
import { IAuthService } from "../../services/implementation/AuthService";
import { LoginUserDTO } from "./LoginUserDTO";
import { 
    UserDoesNotExist,
    PasswordOrEmailInvalid
} from "./LoginUserErrors";

type LoginUserResult = Either<
    Result<AuthTokens>,
    | UserDoesNotExist
    | PasswordOrEmailInvalid
    | AppError.InputError
    | AppError.UnexpectedError
>

export class LoginUser implements UseCase<LoginUserDTO, LoginUserResult> {
    constructor(
        private userRepo: IUserRepo,
        private authService: IAuthService
    ) {}

    async execute(dto: LoginUserDTO): Promise<LoginUserResult> {
        try {
            //#region - Check for nothingness in the DTO
            const guardResult = Guard.againstNullOrUndefinedBulk([
                { argument: dto.email, argumentName: 'email' },
                { argument: dto.password, argumentName: 'password' }
            ])
            if (!guardResult.succeeded) {
                return left(new AppError.InputError(guardResult.message || ''))
            }
            //#endregion
            
            // When user is created, the email is converted to lowercase. When user logs in, convert the email to lowercase so the user can access account.
            dto.email = dto.email.toLowerCase()
            //#region - Run validation on the email and password
            const emailOrError = UserEmail.create({ value: dto.email });
            const passwordOrError = UserPassword.create({ value: dto.password, hashed: false });
            const combinedResult = Result.combine([emailOrError, passwordOrError
            ]);
            if (combinedResult.isFailure) {
                return left(new AppError.InputError(combinedResult.error.toString()))
            };
            //#endregion
        
            //#region - If dto is valid, fetch user by email
            const user = await this.userRepo.getUserByEmail(dto.email);
            if (!user) {
                return left(new UserDoesNotExist())
            }
            //#endregion

            //#region - Compare passwords
            const passwordsMatch = await user.password.comparePassword(dto.password, user.password.value);
            if (!passwordsMatch) {
                return left(new PasswordOrEmailInvalid());
            }
            //#endregion

            //#region - Sign jwt
            const authTokens = this.authService.signJwt({
                userId: user.userId.id.toString(),
                email: user.email.value,
                username: user.username?.value || ''
            });
            //#endregion
    
            return right(Result.ok(authTokens))
        } catch (error) {
            console.log(error)
            return left(new AppError.UnexpectedError())
        }    
    }
}