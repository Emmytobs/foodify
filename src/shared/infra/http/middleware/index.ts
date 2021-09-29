import { authService } from "../../../../modules/user/services/implementation/AuthService";
import { AuthMiddleware } from "./AuthMiddleware";

const authMiddleware = new AuthMiddleware(authService)

export {
    authMiddleware
}