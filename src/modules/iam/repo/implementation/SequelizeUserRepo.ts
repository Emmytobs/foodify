// @ts-nocheck
import { Models } from 'sequelize';

import { User } from '../../domain/user';
import { UserEmail } from '../../domain/userEmail';
import { UserId } from '../../domain/userId';
import { UserMap } from '../../mappers/userMap';
import { IUserRepo } from '../userRepo';

export default class SequelizeUserRepo implements IUserRepo {

    constructor(private models: any) {

    }
    createUser() {
        // Perform operation on persistence technology
    }

    async exists(userEmail: UserEmail | string) {
        const userWithEmailInDB = await this.models.UserModel.findOne({
            where: {
                email: userEmail instanceof UserEmail ?
                    userEmail.value : 
                    userEmail
            }
        });
        return !!userWithEmailInDB
    }

    async getUserByUserName(username: string): Promise<User> {
        const rawUser = await this.models.UserModel.findOne({
            where: {
                username
            }
        });
        return UserMap.toDomain(rawUser);
    }

    async getUserByEmail(email: string): Promise<User> {
        const rawUser = await this.models.UserModel.findOne({
            where: { email }
        });
        return UserMap.toDomain(rawUser);
    }

    async getUserByUserId(userId: string): Promise<User> {
        const rawUser = await this.models.UserModel.findOne({
            where: { userId }
        });
        return UserMap.toDomain(rawUser);
    }

    async save(user: User) {
        const rawUser = await UserMap.toPersistence(user);
        const userExists = await this.exists(user.email)
        if (userExists) {
            // Update user heres
            return;
        }
        await this.models.UserModel.create(rawUser);
    }

    async delete(userId: UserId) {
        await this.models.UserModel.remove({
            where: { userId }
        })
    }
}

/**
 * User.create({ ...userProps });
 * - user is created (new User)
 * - user is saved from repo.
 *  - it is checked
 * - since the user is a new user, it adds a domain event
 */

/**
 * User.create({ ..userProps }, new UniqueEntityID())
 * - user is created (using new User)
 * - since the user is an existing user (because a id was passed in), it does not add a domain event
 */