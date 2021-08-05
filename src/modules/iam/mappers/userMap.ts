import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/userName";
import { UserPassword } from "../domain/userPassword";

export class UserMap {
    // static toDTO() {

    // }

    static toDomain(user: any): User {
        const emailOrError = UserEmail.create(user.email);
        const passwordOrError = UserPassword.create(user.password);
        const usernameOrError = UserName.create({ value: user.username })

        const userOrError = User.create({
            email: emailOrError.getValue(),
            password: passwordOrError.getValue(),
            firstname: user.firstname,
            roles: user.roles,
            username: usernameOrError.getValue()
        });

        if (userOrError.isFailure) {
            console.log(userOrError.error);
            return null;
        }
        return userOrError.getValue();
    }

    static async toPersistence(user: User): Promise<any> {
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
            username: user.username.value,
            email: user.email.value,
            password,
            is_email_verified: user.isEmailVerified
        };
    }
}