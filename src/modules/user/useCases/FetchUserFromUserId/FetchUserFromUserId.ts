import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { JWTClaims } from "../../domain/jwt";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repo/userRepo";

import { UserNotFoundError } from './FetchUserFromUserIdErrors'

type FetchUserFromUserIdResult = Either<
    Result<User>,
    | AppError.UnexpectedError
    | UserNotFoundError
>

export class FetchUserFromUserId implements UseCase<JWTClaims, FetchUserFromUserIdResult> {

    constructor(
        private userRepo: IUserRepo
    ) {}

    async execute(dto: JWTClaims): Promise<FetchUserFromUserIdResult> {
        try {
            const user = await this.userRepo.getUserByUserId(dto.userId);

            if (user) {
                return right(Result.ok<User>(user));
            } else {
                return left(new UserNotFoundError())
            }
        } catch (error) {
            return left(new AppError.UnexpectedError())
        }
    }
}