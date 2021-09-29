import { Result } from "../../../../shared/core/Result"
import { UseCaseError } from "../../../../shared/core/UseCaseError"

export class EmailAlreadyTakenError extends Result<UseCaseError> {
    constructor() {
        super(
            false, 
            { message: 'A user exists with that email' } as UseCaseError
        )
    }
}

export class UsernameAlreadyTakenError extends Result<UseCaseError> {
    constructor() {
        super(
            false,
            { message: 'Your username is already taken' } as UseCaseError
        )
    }
}

export class UserPasswordInvalidError extends Result<UseCaseError> {
    constructor() {
        super(
            false,
            { message: 'Password or email is invalid' } as UseCaseError
        )
    }
}


const e = new EmailAlreadyTakenError()