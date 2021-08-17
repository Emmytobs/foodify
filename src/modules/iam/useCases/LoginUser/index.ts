import { userRepo } from "../../repo";
import { authService } from "../../services/implementation/AuthService";
import { LoginUser } from "./LoginUser";
import { LoginUserController } from "./LoginUserController";

const loginUserUseCase = new LoginUser(userRepo, authService);
const loginUserController = new LoginUserController(loginUserUseCase);

export {
    loginUserController
}