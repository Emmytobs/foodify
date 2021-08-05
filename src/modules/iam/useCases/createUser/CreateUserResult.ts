import { Either } from "../../../../shared/core/Result";

import {
    UserExistsError,
    UserPasswordInvalidError
} from './CreateUserErrors'

export class CreateUserSuccess {
    userId: string;

    constructor(userId: string) {
        this.userId = userId
    }
}

export type CreateUserResult = Either<
    CreateUserSuccess,
    | UserExistsError
    | UserPasswordInvalidError
>