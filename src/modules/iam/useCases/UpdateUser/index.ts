import { userRepo } from "../../repo";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserController } from "./UpdateUserController";

const updateUserUseCase = new UpdateUser(userRepo)

const updateUserController = new UpdateUserController(updateUserUseCase)

export {
    updateUserController
}