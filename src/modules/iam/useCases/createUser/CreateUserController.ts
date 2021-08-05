import BaseController from "../../../../shared/infra/http/models/BaseController";
import CreateUser from "./CreateUser";
import { CreateUserDTO } from "./CreateUserDTO";
import {
    UserExistsError,
    UserPasswordInvalidError
} from './CreateUserErrors'

export class CreateUserController extends BaseController {
    constructor(private useCase: CreateUser) {
        super();
    }

    async executeImpl(req, res) {
        const reqBody = req.body;
        const dto = reqBody as CreateUserDTO

        const result = await this.useCase.execute(dto);
        if (result.isRight) {
            this.ok(res, result.value)
            return;
        }

        const error = result.value;

        switch(error.constructor) {
            case UserExistsError:
            case UserPasswordInvalidError:
                this.clientError(res, error);
        }
    }
}