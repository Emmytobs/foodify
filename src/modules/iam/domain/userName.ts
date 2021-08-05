import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";

interface UserNameProps {
    value: string
}

export class UserName extends Entity<UserNameProps> {
    private static MIN_CHARACTERS_IN_USERNAME = 3;
    private constructor(props: UserNameProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get value() {
        return this.props.value;
    }

    public static create(props: UserNameProps): Result<UserName> {
        const guardResult = Guard.againstNullOrUndefined(props.value, 'username');
        if (!guardResult.succeeded) {
            return Result.fail<UserName>(undefined);
        }

        const hasMinimumChars = Guard.againstAtLeast(this.MIN_CHARACTERS_IN_USERNAME, props.value);
        if (!hasMinimumChars) {
            return Result.fail<UserName>(`Username must be at least ${this.MIN_CHARACTERS_IN_USERNAME} characters`)
        };

        return Result.ok<UserName>(new UserName(
            { value: props.value }
        ));
    }
}