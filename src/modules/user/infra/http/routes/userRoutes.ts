import express from 'express';
import { createUserController } from '../../../useCases/CreateUser';
import { loginUserController } from '../../../useCases/LoginUser';
import { updateUserController } from '../../../useCases/UpdateUser';

export const userRouter = express.Router();

userRouter.post(
    '/register', 
    (req, res) => createUserController.execute(req, res)
)

userRouter.post(
    '/login', 
    (req, res) => loginUserController.execute(req, res)
)

userRouter.put(
    '/', 
    // Insert middleware here
    (req, res) => updateUserController.execute(req, res)
)