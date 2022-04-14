import express from 'express'
import { AppError } from '../../../../shared/core/AppError';

import BaseController from "../../../../shared/infra/http/models/BaseController";
import { CreateVendorSignupRequest } from './CreateVendorSignupRequest';
import { CreateVendorSignupRequestDTO } from './CreateVendorSignupRequestDTO';

export class CreateVendorSignupRequestController extends BaseController {

    constructor(private useCase: CreateVendorSignupRequest) {
        super()
    }

    async executeImpl(req: express.Request, res: express.Response) {
        try {
            const dto: CreateVendorSignupRequestDTO = req.body;
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;
                switch(error.constructor) {
                    case AppError.InputError:
                        return this.clientError(res, undefined, error.errorValue().toString())
                    case AppError.UnexpectedError:
                        return this.fail(res)
                }
            } else {
                return this.created(res);
            }

        } catch (error) {
            return this.fail(res)
        }
    }
}