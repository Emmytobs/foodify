import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
        super(
            false,
            { message: 'User in token does not exist' }
        )
    }
}