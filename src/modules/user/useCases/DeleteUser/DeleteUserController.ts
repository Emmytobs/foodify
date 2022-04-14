import express from "express"
import BaseController from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedExpressRequest";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { DeleteUser } from "./DeleteUser";

export class DeleteUserController extends BaseController {

    constructor(
        private useCase: DeleteUser
    ) {
        super()
    }

    executeImpl(req: DecodedExpressRequest, res: express.Response) {
        const dto = req.body as DeleteUserDTO;
        
        const result = this.useCase.execute(dto);
        this.ok(res)
        console.log(result)
    }
}