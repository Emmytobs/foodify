import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class UserDoesNotExist extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: 'User not found'
        } as UseCaseError)
    }
}

export class PasswordOrEmailInvalid extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: 'Email or password is invalid'
        } as UseCaseError)
    }
}