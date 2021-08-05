import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";

export interface IUserRepo{
    createUser: () => any
    exists: (userEmail: UserEmail) => Promise<boolean>
    getUserByUserName: (username: string) => Promise<User>
    save: (user: User) => void
}