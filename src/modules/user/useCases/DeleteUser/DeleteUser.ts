import { AppError } from "../../../../shared/core/AppError";
import { isNil } from "../../../../shared/core/Nil";
import { Either, left, right, Result } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../repo/userRepo";
import { DeleteUserDTO } from "./DeleteUserDTO";
import * as DeleteUserErrors from './DeleteUserErrors'

type DeleteUserResult = Either<
    Result<void>,
    | AppError.InputError
    | AppError.UnexpectedError
>

export class DeleteUser implements UseCase<DeleteUserDTO, DeleteUserResult> {

    constructor(
        private userRepo: IUserRepo
    ) {}

    async execute(dto: DeleteUserDTO): Promise<DeleteUserResult>  {
        try {
            const { userId } = dto
            //#region - Return an error if no user id is passed in
            const userIdNotPassedIn = isNil(userId);
            if (userIdNotPassedIn) {
                return left(new DeleteUserErrors.UserIdNotProvided());    
            }
            // const guardResult = Guard.againstNullOrUndefined(dto.userId, 'userId');
            // if (!guardResult.succeeded) {
            //     return left(new DeleteUserErrors.UserIdNotProvided());
            // }
            //#endregion

            //#region - Return an error if the user does not exist
            const user = await this.userRepo.getUserByUserId(userId);
            if (!user) {
                return left(new DeleteUserErrors.UserNotFoundError(userId));
            }
            //#endregion 

            //#region - If the user exists, delete the user
            await this.userRepo.delete(user.userId)
            return right(Result.ok<void>())
            //#endregion 
        } catch (error) {
            return left(new AppError.UnexpectedError())
        }
    }
}