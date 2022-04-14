import express from 'express'
import { AppError } from '../../../../shared/core/AppError';
import BaseController from "../../../../shared/infra/http/models/BaseController";
import CreateUser from "./CreateUser";
import { CreateUserDTO } from "./CreateUserDTO";
import * as CreateUserErrors from './CreateUserErrors';

export class CreateUserController extends BaseController {
    constructor(private useCase: CreateUser) {
        super();
    }

    async executeImpl(req: express.Request, res: express.Response) {
        const reqBody = req.body;
        const dto = reqBody as CreateUserDTO
        
        try {
            const result = await this.useCase.execute(dto);
            
            if (result.isLeft()) {
                const error = result.value;
                
                switch(error.constructor) {
                    case CreateUserErrors.EmailAlreadyTakenError:
                    case CreateUserErrors.UsernameAlreadyTakenError:
                        return this.conflict(res, undefined, error.errorValue().message)
                        // break;
                    case CreateUserErrors.UserPasswordInvalidError:
                        return this.notFound(res, undefined, error.errorValue().message)
                        // break;
                    case AppError.InputError:
                        return this.clientError(res, undefined, error.errorValue().message)
                        // break;
                    case AppError.UnexpectedError:
                    default:
                        return this.fail(res, undefined)
                }
            } else {
                return this.created(res, undefined, 'User created successfully');
            }
        } catch (error) {
            return this.fail(res, undefined)
        }
    }
}