import express from 'express';
import BaseController from "../../../../shared/infra/http/models/BaseController";
import { LoginUser } from "./LoginUser";
import { LoginUserDTO } from "./LoginUserDTO";

export class LoginUserController extends BaseController {
    constructor(
        private useCase: LoginUser
    ) {
        super();
    }

    async executeImpl(req: express.Request, res: express.Response) {
        const dto = req.body as LoginUserDTO
        
        const result = await this.useCase.execute(dto);
        if (result.isLeft()) {
            // Handle errors
            this.fail(res)
            return;
        }
        
    }
}