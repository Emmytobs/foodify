export interface JWTClaims {
    userId: string;
    email: string;
    username: string;
}

export type AccessToken = string;
export type RefreshToken = string;

export interface AuthTokens {
    accessToken: AccessToken
    refreshToken: RefreshToken
}