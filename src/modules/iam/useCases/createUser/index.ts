import SequelizeUserRepo from "../../repo/implementation/SequelizeUserRepo";
import CreateUser from "./CreateUser";
import { CreateUserController } from "./CreateUserController";

const createUserUseCase = new CreateUser(new SequelizeUserRepo(''))
const createUserController = new CreateUserController(createUserUseCase)

export {
    createUserController
}
