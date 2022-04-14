import { Response } from 'express'
import BaseController from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedExpressRequest";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserDTO } from "./UpdateUserDTO";

export class UpdateUserController extends BaseController {

    constructor(
        private useCase: UpdateUser
    ) {
        super()
    }

    executeImpl(req: DecodedExpressRequest, res: Response) {
        const dto = req.body as UpdateUserDTO

        const result = this.useCase.execute(dto);

        console.log(result);

        this.ok(res)
    }
}