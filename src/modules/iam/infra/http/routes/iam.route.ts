// @ts-nocheck
import express from 'express';
import { createUserController } from '../../../useCases/CreateUser';
import { loginUserController } from '../../../useCases/LoginUser';
import { updateUserController } from '../../../useCases/UpdateUser';

export const iamRoutes = express.Router();

iamRoutes.post(
    '/', 
    (req, res) => createUserController.execute(req, res)
)

iamRoutes.post(
    '/login', 
    (req, res) => loginUserController.execute(req, res)
)

iamRoutes.put(
    '/', 
    // Insert middleware here
    (req, res) => updateUserController.execute(req, res)
)