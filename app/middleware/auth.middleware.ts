import express from "express";
import {getResponse} from "../controllers/helpers/response.helper";
import {StatusCodes} from "http-status-codes";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Container} from "typedi";
import {validationPipe} from "./validation/validation";
import {UserPayloadDto} from "../dto/user.dto";
import {UnauthorizedUserError} from "./errors/unauthorized.user.error";

/**
 * Verify current token and valid with UserPayloadDto schema
 * @param auth
 */
async function verifyToken(auth: string): Promise<JwtPayload> {
    let authorization = auth.split(' ');
    if (authorization[0] === 'Bearer') {
        let jwtSecret: string = Container.get('jwt.secret');
        let payload: JwtPayload | null = null
        let result: any = []
        try {
            payload = <JwtPayload>jwt.verify(authorization[1], jwtSecret);
            result = await validationPipe(UserPayloadDto, {...payload});
        } catch (err) {
            console.log(err)
            throw new UnauthorizedUserError();
        }

        if (result !== true) {
            throw new Error()
        }
        return payload;
    }
    throw new UnauthorizedUserError();
}

export class AuthMiddleware {
    private static instance: AuthMiddleware;

    static getInstance() {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    /**
     * Validate token if exist
     * @param req
     * @param res
     * @param next
     */
    async verifyOptionalToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.headers['authorization'] && typeof req.headers['authorization'] === 'string') {
            try {
                req.body.userPayload = await verifyToken(req.headers['authorization'])
                next();
            } catch (err) {
                if (err instanceof UnauthorizedUserError) {
                    return getResponse(res, StatusCodes.UNAUTHORIZED, null);
                }
                return getResponse(res, StatusCodes.FORBIDDEN, null);
            }
        } else {
            req.body.userPayload = null;
            next();
        }
    }

    /**
     * Validate token
     * @param req
     * @param res
     * @param next
     */
    async verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.headers['authorization'] && typeof req.headers['authorization'] === 'string') {
            try {
                req.body.userPayload = await verifyToken(req.headers['authorization'])
                next();
            } catch (err) {
                return getResponse(res, StatusCodes.FORBIDDEN, null);
            }
        } else {
            return getResponse(res, StatusCodes.UNAUTHORIZED, null);
        }
    }
}