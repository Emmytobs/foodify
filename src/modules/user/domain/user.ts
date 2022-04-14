import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";
import { UserCreated } from "./events/UserCreated";
import { UserEmail } from "./userEmail";
import { UserId } from "./userId";
import { UserName } from "./userName";
import { UserPassword } from "./userPassword";
import { UserRoles } from "./userRoles";

export interface UserProps {
    email: UserEmail;
    password: UserPassword;
    roles: UserRoles;
    username?: UserName;
    firstname?: string;
    lastname?: string;
    isEmailVerified?: boolean;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User extends AggregateRoot<UserProps> {
    get userId(): UserId { return UserId.create(this._id).getValue(); }
    get firstname() { return this.props.firstname }
    get lastname() { return this.props.lastname }
    get username() { return this.props.username }
    get email() { return this.props.email }
    get password() { return this.props.password }
    get roles() { return this.props.roles }
    get isEmailVerified() { return this.props.isEmailVerified }
    get lastLogin() { return this.props.lastLogin }
    get createdAt() { return this.props.createdAt }
    get updatedAt() { return this.props.updatedAt }

    updateFirstname(firstname: string) {
        this.props.firstname = firstname;
        return Result.ok();
    }
    updateLastname(lastname: string) {
        this.props.lastname = lastname;
        return Result.ok();
    }
    updatePassword(password: string) {
        const passwordOrError = UserPassword.create({ value: password, hashed: false });
        if (passwordOrError.isFailure) {
            return Result.fail<UserPassword>(passwordOrError.errorValue().toString());
        }
        this.props.password = passwordOrError.getValue();
        return Result.ok<UserPassword>();
    }
    updateUsername(username: string) {
        const usernameOrError = UserName.create({ value: username });
        if (usernameOrError.isFailure) {
            return Result.fail<UserName>(usernameOrError.errorValue().toString());
        }
        this.props.username = usernameOrError.getValue();
        return Result.ok<UserName>();
    }

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        //#Step 1 - Validate user data using the Guard class
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.email, argumentName: 'UserEmail' },
            { argument: props.password, argumentName: 'UserPassword' }
        ])
            // if invalid send an error, else continue
        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message || '');
        }
        //#Step 2 - If it's a new user, simply send a domain event. Else, return an instance of the user.
        const user = new User({
            ...props,
            isEmailVerified: props.isEmailVerified || false,
            lastLogin: props.lastLogin || new Date(),
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        }, id)
        const isNewUser = !id;
        
        if (isNewUser) {
            // Send domain event
            user.addDomainEvent(new UserCreated(user))
        }
        // return instance of user
        return Result.ok<User>(user);

    }
}