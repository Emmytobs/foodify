import express from 'express'

import BaseController from "../../../../shared/infra/http/models/BaseController";
import { CreateVendorDTO } from './CreateVendorDTO'
import { CreateVendor } from './CreateVendor'
import * as CreateVendorErrors from "./CreateVendorErrors";
export class CreateVendorController extends BaseController {
    constructor(
        private useCase: CreateVendor
    ) {
        super()
    }
    async executeImpl(req: express.Request, res: express.Response) {
        const dto =  req.body as CreateVendorDTO
        
        try {
            const result = await this.useCase.execute(dto)

            if (result.isLeft()) {
                const error = result.value
                switch(error.constructor) {
                    case CreateVendorErrors.UserIdNotSupplied:
                        return this.clientError(res, undefined, error.errorValue())
                    case CreateVendorErrors.UserWithUserIdNotFound:
                        return this.notFound(res, undefined, error.errorValue())
                }
            } 
            const successMessage = result.value.getValue()
            return this.created(res, undefined, successMessage)

        } catch (error) {
            return this.fail(res)
        }
    }
}