import express from "express";
import {UserService} from "../services/user.service";
import {Container} from "typedi";
import {UserServiceInterface} from "../services/interfaces/user.service.interface";
import {getResponse} from "./helpers/response.helper";
import {StatusCodes} from "http-status-codes";
import {UserDto} from "../dto/user.dto";

const UserSavedMessage: string = 'List of sellers';

export class SellerController {
    async getAll(req: express.Request, res: express.Response) {
        let userService: UserServiceInterface = Container.get(UserService);
        try {
            const sellerList: UserDto[] = await userService.getAll();
            return getResponse(res, StatusCodes.OK, sellerList, UserSavedMessage);
        } catch (err) {
            return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
        }
    }
}
