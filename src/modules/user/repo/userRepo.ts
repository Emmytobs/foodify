import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserId } from "../domain/userId";

export interface IUserRepo{
    exists: (userEmail: UserEmail | string) => Promise<boolean>
    getUserByUserName: (username: string) => Promise<User | null>
    getUserByEmail: (email: string) => Promise<User | null>
    getUserByUserId: (userId: string) => Promise<User | null>
    save: (user: User) => void
    delete: (user: UserId) => void
}