import express from "express";
import {ProductRouter} from "./routes/product.router";
import {RouterInterface} from "./routes/interfaces/router.interface";

export function setupRoutes(app: express.Application) {
    const routes: any = [];
    routes.push(new ProductRouter(app));
    routes.forEach((route: RouterInterface) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
}