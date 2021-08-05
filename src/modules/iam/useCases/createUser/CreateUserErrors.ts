import { UseCaseError } from "../../../../shared/core/UseCaseError"

export class EmailAlreadyTakenError implements UseCaseError {
    message: string
    constructor() {
        this.message = 'A user exists with that email'
    }
}

export class UsernameAlreadyTakenError implements UseCaseError {
    message: string
    constructor() {
        this.message = 'Your username is already taken'
    }
}

export class UserPasswordInvalidError implements UseCaseError {
    message: string
    constructor() {
        this.message = 'Password supplied is invalid'
    }
}
