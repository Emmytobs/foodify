import { authService } from "../../../../modules/iam/services/implementation/AuthService";
import { AuthMiddleware } from "./AuthMiddleware";

const authMiddleware = new AuthMiddleware(authService)

export {
    authMiddleware
}