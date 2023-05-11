import express from "express";
import {AbstractRouter} from "./abstract.router";
import {RouterInterface} from "./interfaces/router.interface";
import {SellerController} from "../controllers/seller.controller";

export class SellerRouter extends AbstractRouter implements RouterInterface {
    /**
     * @inheritDoc
     */
    constructor(public app: express.Router) {
        super(app, "SellerRouter");
        this.configureRoutes();
    }

    /**
     * @inheritDoc
     */
    configureRoutes() {
        let sellerController = new SellerController();
        this.app.get(`/sellers`, [
            sellerController.getAll,
        ]);
    }
}