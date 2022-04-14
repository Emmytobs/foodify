// @ts-nocheck
import express from 'express';
import { JWTClaims } from "../../../domain/jwt";

export type DecodedExpressRequest = express.Request & {
    decoded: JWTClaims
}