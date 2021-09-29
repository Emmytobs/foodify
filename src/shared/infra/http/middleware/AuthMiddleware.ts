import express, { NextFunction } from 'express';
import { IAuthService } from '../../../../modules/user/services/implementation/AuthService';
import { fetchUserFromUserId } from '../../../../modules/user/useCases/FetchUserFromUserId';
import { UserNotFoundError } from '../../../../modules/user/useCases/FetchUserFromUserId/FetchUserFromUserIdErrors';
import { AppError } from '../../../core/AppError';

export class AuthMiddleware {
    constructor(
        private authService: IAuthService
    ) {
        
    }

    endRequest(
        res: express.Response,
        message: string,
        statusCode: number
    ) {
        res.status(statusCode).json(message)
    }

    getJWTFromAuthHeader(authHeaderValue: string): string {
        return authHeaderValue.split(' ')[1];
    }

    async authenticate(req: express.Request, res: express.Response, next: NextFunction) {
        const authToken = this.getJWTFromAuthHeader(req.headers['authorization'] || '');
        if (!authToken) {
            return this.endRequest(res, 'No auth token provided', 401)
        }

        const decoded = this.authService.decodeJwt(authToken, 'access');
        if (!decoded) {
            return this.endRequest(res, 'Token signature expired', 401);
        }

        const result = await fetchUserFromUserId.execute(decoded);

        if (result.isRight()) {
            return next();
        }

        const errorClass = result.value;

        switch(errorClass.constructor) {
            case UserNotFoundError:
                this.endRequest(res, errorClass.getValue().toString(), 404)
            case AppError.UnexpectedError:
                this.endRequest(res, 'Error authenticating', 500);
        }
    }
}