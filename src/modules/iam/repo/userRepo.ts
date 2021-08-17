import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserId } from "../domain/userId";

export interface IUserRepo{
    createUser: () => any
    exists: (userEmail: UserEmail | string) => Promise<boolean>
    getUserByUserName: (username: string) => Promise<User>
    getUserByEmail: (email: string) => Promise<User>
    getUserByUserId: (userId: string) => Promise<User>
    save: (user: User) => void
    delete: (user: UserId) => void
}