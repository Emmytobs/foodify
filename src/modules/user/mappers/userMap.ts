import { Result } from "../../../shared/core/Result";
import { UserModelAttr } from "../../../shared/infra/database/sequelize/models/UserModel";
import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/userName";
import { UserPassword } from "../domain/userPassword";

export class UserMap {
    // static toDTO() {

    // }

    static toDomain(user: any): User {
        const emailOrError = UserEmail.create({ value: user.email });
        const passwordOrError = UserPassword.create({value: user.password, hashed: true });

        const userOrError = User.create({
            email: emailOrError.getValue(),
            password: passwordOrError.getValue(),
            firstname: user.firstname,
            roles: user.roles,
            username: user.username ? UserName.create({ value: user.username }).getValue() : undefined
        });

        if (userOrError.isFailure) {
            // If it's a failed result, throw an error
            throw new Error(userOrError.error?.toString())
        }
        return userOrError.getValue();
    }

    static async toPersistence(user: User): Promise<UserModelAttr> {
        let password: any;
        if (user.password.isHashed()) {
            password = user.password.value
        } else {
            password = await user.password.getHashedValue();
        }

        
        return {
            userId: user.userId.id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username?.value,
            email: user.email.value,
            password,
            is_email_verified: user.isEmailVerified!,
            roles: user.roles.value,
            lastLogin: user.lastLogin!
        };
    }
}