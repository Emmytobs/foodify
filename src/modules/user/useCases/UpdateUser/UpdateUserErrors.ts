import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class InvalidUpdateError extends Result<UseCaseError> {
    constructor(){
        super(false, {
            message: 'Update operation is invalid'
        } as UseCaseError)
    }
}

export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string){
        super(false, {
            message: `No user found with id ${userId}`
        } as UseCaseError)
    }
}

export class PropertyToUpdateIsInvalid extends Result<UseCaseError> {
    constructor(message: string){
        super(false, {
            message
        } as UseCaseError)
    }
}