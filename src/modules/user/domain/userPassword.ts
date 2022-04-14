import bcrypt from 'bcryptjs'

import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface UserPasswordProps {
    value: string
    hashed?: boolean
}

export class UserPassword extends ValueObject<UserPasswordProps> {
    get value() {
        return this.props.value
    }

    private static minimumLength = 8;

    public static create(props: UserPasswordProps): Result<UserPassword> {
        if (!this.isAppropriateLength(props.value)) {
            return Result.fail<UserPassword>(`Password must be greater than ${this.minimumLength} characters`)
        }
        return Result.ok<UserPassword>(
            new UserPassword(props)
        );
    }
    public isHashed(): boolean {
        return !!this.props.hashed
    }
    public async getHashedValue() {
        if (this.isHashed()) 
            return this.props.value;
        return this.hashPassword(this.props.value);
    }

    public async comparePassword(plainTextPassword: string, savedPassword: string): Promise<boolean> {
        return (await this.bcryptCompare(plainTextPassword, savedPassword))
        // if (this.isHashed) {
        //     const hashed = this.props.value
        //     return this.bcryptCompare(plainTextPassword, hashed)
        // }
        // return this.props.value === plainTextPassword;
    }
    
    private static isAppropriateLength(password: string): boolean {
        const isOfMinimumLength = password.length >= this.minimumLength;
        return !!isOfMinimumLength;
    }
    
    private async bcryptCompare(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const compareResult = await bcrypt.compare(plainTextPassword, hashedPassword)
        return !!compareResult
    }

    private async hashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 6);
        return hashedPassword;
    }


}