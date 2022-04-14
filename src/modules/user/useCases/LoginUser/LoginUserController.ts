import express from 'express';
import { AppError } from '../../../../shared/core/AppError';
import BaseController from "../../../../shared/infra/http/models/BaseController";
import { LoginUser } from "./LoginUser";
import { LoginUserDTO } from "./LoginUserDTO";
import * as LoginUserErrors from './LoginUserErrors';

export class LoginUserController extends BaseController {
    constructor(
        private useCase: LoginUser,
    ) {
        super();
    }

    async executeImpl(req: express.Request, res: express.Response) {
        const dto = req.body as LoginUserDTO

        try {
            const result = await this.useCase.execute(dto);
            
            console.log(result)

            if (result.isRight()) {
                this.ok(res, result.value.getValue())
                return;
            }

            const error = result.value
            switch(error.constructor) {
                case LoginUserErrors.UserDoesNotExist:
                case LoginUserErrors.PasswordOrEmailInvalid:
                    return this.notFound(res, undefined, error.errorValue().message);
                case LoginUserErrors.PasswordOrEmailInvalid:
                case AppError.InputError:
                    return this.clientError(res, undefined, error.errorValue().message)
                case AppError.UnexpectedError:
                default:
                    return this.fail(res, error.errorValue().message)
            } 
        } catch (error) {
            return this.fail(res)
        }
        
    }
}