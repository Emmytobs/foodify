import { sequelizeUserRepo } from "../../repo";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserController } from "./UpdateUserController";

const updateUserUseCase = new UpdateUser(sequelizeUserRepo)

const updateUserController = new UpdateUserController(updateUserUseCase)

export {
    updateUserController
}