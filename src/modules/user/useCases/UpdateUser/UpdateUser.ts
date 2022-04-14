import { AppError } from "../../../../shared/core/AppError";
import { Guard, GuardArgumentCollection } from "../../../../shared/core/Guard";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repo/userRepo";
import { UpdatablePropertiesOfTheUser, UpdateUserDTO } from "./UpdateUserDTO";
import * as UpdateUserErrors from "./UpdateUserErrors";

type UpdateUserResponse = Either<
    Result<any>,
    | UpdateUserErrors.PropertyToUpdateIsInvalid
    | UpdateUserErrors.UserNotFoundError
    | AppError.InputError
    | AppError.UnexpectedError
>

export class UpdateUser implements UseCase<UpdateUserDTO, UpdateUserResponse> {

    private updates: Result<any>[] = [];

    constructor(
        private userRepo: IUserRepo
    ) {}

    private addUpdate(update: Result<any>) {
        this.updates.push(update);
    }

    private getCombinedUpdates() {
        return Result.combine(this.updates);
    }

    async execute(dto: UpdateUserDTO): Promise<UpdateUserResponse> {
        try {
            const { userId } = dto;
            const validPropertiesToUpdate = Object.keys({
                firstname: '',
                lastname: '',
                username: '',
                password: '',
            } as UpdateUserDTO['fieldsToUpdate']);

            const {
                firstname,
                lastname,
                password,
                username,
            } = dto.fieldsToUpdate;

            //#region - Return an error if the user doesn't exist in the database
            const user = await this.userRepo.getUserByUserId(userId);
            if (!user) {
                return left(new UpdateUserErrors.UserNotFoundError(userId));
            }
            //#endregion
            
            const fieldsToUpdate = Object.keys(dto.fieldsToUpdate) as UpdatablePropertiesOfTheUser[];
            
            //#region - Ensure the fields being sent are valid update-able properties of the user model
            const guardCollection: GuardArgumentCollection = fieldsToUpdate.map(
                (fieldName) => ({
                    argument: dto.fieldsToUpdate[fieldName],
                    argumentName: fieldName 
                })
            );

            const guardResult = Guard.areOneOf(validPropertiesToUpdate, guardCollection);
            if (!guardResult.succeeded) {
                return left(new UpdateUserErrors.PropertyToUpdateIsInvalid(guardResult.message || ''))
            }
            //#endregion

            //#region - Update the individual properties of the user
            if (firstname) { this.addUpdate(user.updateFirstname(firstname)) }
            if (lastname) { this.addUpdate(user.updateLastname(lastname)) }
            if (username) { this.addUpdate(user.updateUsername(username)) }
            if (password) { this.addUpdate(user.updatePassword(password)) }
            
            const combinedUpdatesResult = this.getCombinedUpdates();
            if (combinedUpdatesResult.isFailure) {
                return left(new AppError.InputError(combinedUpdatesResult.errorValue().toString()))
            }
            //#endregion

            //#region - Save the updated user
            await this.userRepo.save(user);

            const savedUser = await this.userRepo.getUserByUserId(userId);
            if (!savedUser) throw new Error('Exception: Could not fetch user after saving');
            
            return right(Result.ok<User>(savedUser));
            
            //#endregion 
        } catch (error) {
            return left(new AppError.UnexpectedError())
        }
    }

}