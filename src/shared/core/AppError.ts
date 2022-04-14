import { Result } from './Result'
import { UseCaseError } from './UseCaseError';

export namespace AppError {
    export class UnexpectedError extends Result<UseCaseError> {
        constructor() {
            super(
                false, {
                    message: 'An unexpected error occured'
                }
            );
        }
    }

    export class InputError extends Result<UseCaseError> {
        constructor(errorMessage: string) {
            super(false, {
                message: errorMessage
            })
        }
    }
}
