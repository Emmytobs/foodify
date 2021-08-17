import { Result } from "../../../../shared/core/Result"
import { UseCaseError } from "../../../../shared/core/UseCaseError"

export class EmailAlreadyTakenError extends Result<UseCaseError> {
    constructor() {
        super(
            false, 
            'A user exists with that email'
        )
    }
}

export class UsernameAlreadyTakenError extends Result<UseCaseError> {
    constructor() {
        super(
            false,
            'Your username is already taken'
        )
    }
}

export class UserPasswordInvalidError extends Result<UseCaseError> {
    constructor() {
        super(
            false,
            'Password or email is invalid'
        )
    }
}
