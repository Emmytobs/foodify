// @ts-nocheck
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';

import { AuthTokens, JWTClaims } from "../../domain/jwt";

export interface IAuthService {
    signJwt(jwtClaims: JWTClaims): AuthTokens
    refreshAuthToken(): any //AuthTokens;
    decodeJwt(token: string, tokenType: 'access' | 'refresh'): JWTClaims | undefined
}

export class AuthService implements IAuthService {
    /**
     * @description Verifies a JWT token
     */
    decodeJwt(token: string, tokenType: 'access' | 'refresh'): JWTClaims | undefined {
        try {
            const decodedToken = jwt.verify(token, tokenType === 'access' ? 
                config.auth.jwtSecret :
                config.auth.refreshTokenSecret
            );
            return decodedToken;
        } catch (error) {
            return undefined;
        }
    }
    
    refreshAuthToken() {    
    }

    signJwt(jwtClaims: JWTClaims): AuthTokens {
        const accessToken = jwt.sign(jwtClaims, config.auth.jwtSecret);
        const refreshToken = jwt.sign(jwtClaims, config.auth.refreshTokenSecret);
        return {
            accessToken, 
            refreshToken
        }
    }
}

const authService = new AuthService()
export {
    authService
}