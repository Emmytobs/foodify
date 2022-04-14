import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class UserIdNotSupplied extends Result<UseCaseError> {
    constructor() {
        super(
            false, {
                message: 'UserId not supplied'
            } as UseCaseError
        )
    }
}

export class UserWithUserIdNotFound extends Result<UseCaseError> {
    constructor(userId: string) {
        super(
            false, {
                message: `No user found with user id: ${userId}`
            } as UseCaseError
        )
    }
}