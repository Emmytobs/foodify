import { Response, Request } from 'express'

type ResponseData = Record<any, any> | any[]

type ResponseShape = {
    status: 'error' | 'success',
    data?: ResponseData, // Allows for an object or array
    message?: string
}
abstract class BaseController {
    execute(req: Request, res: Response) {
        this.executeImpl(req, res)
    }
    abstract executeImpl(req: Request, res: Response): Promise<any> | any

    private jsonResponse(
        res: Response,
        status: number,
        data?: ResponseShape
    ) {
        return res.status(status).json(data)
    }

    ok<T = any>(res: Response, data?: T, message?: string) {
        this.jsonResponse(res, 200, <ResponseShape>{
            status: 'success',
            data,
            message
        });
    }

    created(res: Response, data?: any, message?: string) {
        this.jsonResponse(res, 201, <ResponseShape>{
            status: 'success',
            data,
            message
        });
    }

    conflict(res: Response, data?: any, message?: string) {
        this.jsonResponse(res, 409, <ResponseShape>{
            status: 'error',
            data,
            message: message || 'Conflict'
        });
    }

    clientError(res: Response, data?: any, message?: string) {
        this.jsonResponse(res, 400, <ResponseShape>{
            status: 'error',
            data,
            message
        });
    }
    
    notFound(res: Response, data?: any, message?: string) {
        this.jsonResponse(res, 404, <ResponseShape>{
            status: 'error',
            data,
            message
        });
    }
    
    unauthorized(res: Response, data?: any, message?: string) {
        this.jsonResponse(res, 401, <ResponseShape>{
            status: 'error',
            data,
            message
        });
    }
    
    forbidden(res: Response, data?: any, message?: string) {
        this.jsonResponse(res, 403, <ResponseShape>{
            status: 'error',
            data,
            message
        });
    }
    
    fail(res: Response, message?: string) {
        this.jsonResponse(res, 500, <ResponseShape>{
            status: 'error',
            message: message || 'Unexpected error'
        });
    }
}

export default BaseController