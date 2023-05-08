import express from "express";
import {AbstractRouter} from "./abstract.router";
import {RouterInterface} from "./interfaces/router.interface";
import {UserMiddleware} from "../middleware/user.middleware";
import {AuthController} from "../controllers/auth.controller";

export class AuthRouter extends AbstractRouter implements RouterInterface {
    constructor(public app: express.Router) {
        super(app, "AuthRouter");
        this.configureRoutes();
    }

    configureRoutes() {
        let userController = new AuthController();
        let userMiddleware = UserMiddleware.getInstance();

        this.app.post(`/auth/signup`, [
            userMiddleware.validateUser,
            userMiddleware.mapUserToDto,
            userController.signup,
        ]);

        this.app.post(`/auth/login`, [
            userMiddleware.validateUser,
            userMiddleware.mapUserToDto,
            userController.login,
        ]);
    }
}