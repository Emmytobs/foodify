import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
interface UserEmailProps {
    value: string
}

export class UserEmail extends Entity<UserEmailProps> {
    get value() {
        return this.props.value
    }
    private constructor(props: UserEmailProps) {
        super(props)
    }

    public static create(props: UserEmailProps): Result<UserEmail> {
        if (!this.isValidEmail(props.value)) {
            return Result.fail<UserEmail>('Email address is invalid');
        }
        return Result.ok<UserEmail>(
            new UserEmail({ value: this.formatEmail(props.value) })
        )
    } 

    private static isValidEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    private static formatEmail(email: string) {
        return email.trim().toLowerCase()
    }
}