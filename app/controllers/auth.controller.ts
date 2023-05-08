import express from "express";
import {UserService} from "../services/user.service";
import {Container} from "typedi";
import {UserServiceInterface} from "../services/interfaces/user.service.interface";
import {getResponse} from "./helpers/response.helper";
import {StatusCodes} from "http-status-codes";
import {TokenDto, UserDto, UserRequestDto} from "../dto/user.dto";
import {UserAlreadyExistError} from "../services/errors/user.already.exist.error";
import {AuthService} from "../services/auth.service";
import {AuthServiceInterface} from "../services/interfaces/auth.service.interface";
import {UserPasswordError} from "../services/errors/user.password.error";

const LoginSuccessful: string = 'Login successful';
const UserSavedMessage: string = 'User saved';
const UserAlreadyExistMessage: string = 'User already exist';
const UserPasswordMessage: string = 'Incorrect user or password';

export class AuthController {
    async signup(req: express.Request, res: express.Response) {
        let userService: UserServiceInterface = Container.get(UserService);
        try {
            const user = req.body.user as UserRequestDto
            const storedProduct: UserDto = await userService.create(user);
            return getResponse(res, StatusCodes.CREATED, storedProduct, UserSavedMessage);
        } catch (err) {
            if (err instanceof UserAlreadyExistError) {
                return getResponse(res, StatusCodes.BAD_REQUEST, null, UserAlreadyExistMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }

    async login(req: express.Request, res: express.Response) {
        let authService: AuthServiceInterface = Container.get(AuthService);
        try {
            const userRequest = req.body.user as UserRequestDto
            const token: TokenDto = await authService.login(userRequest);
            return getResponse(res, StatusCodes.OK, token, LoginSuccessful);
        } catch (err) {
            if (err instanceof UserPasswordError) {
                return getResponse(res, StatusCodes.UNAUTHORIZED, null, UserPasswordMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }
}
