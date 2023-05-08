import express from "express";
import {ProductController} from "../controllers/product.controller";
import {AbstractRouter} from "./abstract.router";
import {RouterInterface} from "./interfaces/router.interface";
import {ProductMiddleware} from "../middleware/product.middleware";
import {AuthMiddleware} from "../middleware/auth.middleware";

export class ProductRouter extends AbstractRouter implements RouterInterface {
    constructor(public app: express.Application) {
        super(app, "ProductRouter");
        this.configureRoutes();
    }

    configureRoutes() {
        let productController = new ProductController();
        let authMiddleware = AuthMiddleware.getInstance();
        let productMiddleware = ProductMiddleware.getInstance();

        this.app.get(`/products`, [
            authMiddleware.verifyOptionalToken,
            productController.getAll
        ]);

        this.app.post(`/products`, [
            authMiddleware.verifyToken,
            productMiddleware.validateProduct,
            productMiddleware.mapProductToDto,
            productController.create,
        ]);

        this.app.get(`/products/:id`, [
            authMiddleware.verifyOptionalToken,
            productMiddleware.validateId,
            productController.getOne,
        ]);

        this.app.put(`/products/:id`, [
            authMiddleware.verifyToken,
            productMiddleware.validateId,
            productMiddleware.validateProduct,
            productMiddleware.mapProductToDto,
            productController.update,
        ]);

        this.app.delete(`/products/:id`, [
            authMiddleware.verifyToken,
            productMiddleware.validateId,
            productController.delete,
        ]);
    }
}