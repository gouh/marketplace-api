import express from "express";
import {validationPipe} from "./validation/validation";
import {UserRequestDto} from "../dto/user.dto";
import {getResponse} from "../controllers/helpers/response.helper";
import {StatusCodes} from "http-status-codes";

const invalidUserMessage = "Invalid user";

export class UserMiddleware {
    private static instance: UserMiddleware;

    static getInstance() {
        if (!UserMiddleware.instance) {
            UserMiddleware.instance = new UserMiddleware();
        }
        return UserMiddleware.instance;
    }

    async validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const result: any = await validationPipe(UserRequestDto, {...req.body});
        if (result === true) {
            next();
        } else {
            return getResponse(res, StatusCodes.BAD_REQUEST, null, invalidUserMessage, result);
        }
    }

    async mapUserToDto(req: express.Request, res: express.Response, next: express.NextFunction) {
        const product = req.body;
        req.body.user = {
            email: product.email.trim() || null,
            password: product.password.trim() || null,
            isAdmin: typeof product.isAdmin != 'undefined' ? product.isAdmin : false,
        };
        next();
    }
}

