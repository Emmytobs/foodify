import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repo/userRepo";
import { FetchUserByEmailDTO } from "./FetchUserByEmailDTO";

type FetchUserByEmailResult = Result<User | null>

export class FetchUserByEmail implements UseCase<FetchUserByEmailDTO, FetchUserByEmailResult> {

    constructor(
        private userRepo: IUserRepo
    ) {}

    async execute(dto: FetchUserByEmailDTO): Promise<FetchUserByEmailResult> {
        try {
            const guardResult = Guard.againstNullOrUndefined(dto.email, "User's email")
            if (!guardResult.succeeded) {
                throw new Error(guardResult.message)
            }

            const user = await this.userRepo.getUserByEmail(dto.email)
            return Result.ok(user)

        } catch (error) {
            throw new Error(error as string)
        }
    }
}