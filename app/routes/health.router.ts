import express from "express";
import {AbstractRouter} from "./abstract.router";
import {RouterInterface} from "./interfaces/router.interface";
import {HealthController} from "../controllers/health.controller";

export class HealthRouter extends AbstractRouter implements RouterInterface {
    /**
     * @inheritDoc
     */
    constructor(public app: express.Router) {
        super(app, "HealthRouter");
        this.configureRoutes();
    }

    /**
     * @inheritDoc
     */
    configureRoutes() {
        let healthController = new HealthController();
        this.app.get(`/health`, [
            healthController.get,
        ]);
    }
}