import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
        super(false, {
            message: `User with userId ${userId} does not exist`
        })
    }
};

export class UserIdNotProvided extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: '[UserIdNotProvidedError]: User id not provided.'
        })
    }
}