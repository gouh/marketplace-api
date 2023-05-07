import express from "express";
import {ProductController} from "../controllers/product.controller";
import {AbstractRouter} from "./abstract.router";
import {RouterInterface} from "./interfaces/router.interface";
import {ProductMiddleware} from "../middleware/product.middleware";

export class ProductRouter extends AbstractRouter implements RouterInterface {
    constructor(public app: express.Application) {
        super(app, "ProductRouter");
        this.configureRoutes();
    }

    configureRoutes() {
        let productController = new ProductController();
        let productMiddleware = new ProductMiddleware();

        this.app.get(`/products`, [
            productController.getAll
        ]);

        this.app.post(`/products`, [
            productMiddleware.validateProduct,
            productMiddleware.mapProductToDto,
            productController.create,
        ]);

        this.app.get(`/products/:id`, [
            productMiddleware.validateId,
            productController.getOne,
        ]);

        this.app.put(`/products/:id`, [
            productMiddleware.validateId,
            productMiddleware.validateProduct,
            productMiddleware.mapProductToDto,
            productController.update,
        ]);

        this.app.delete(`/products/:id`, [
            productMiddleware.validateId,
            productController.delete,
        ]);
    }
}