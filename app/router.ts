import express from "express";
import {ProductRouter} from "./routes/product.router";
import {RouterInterface} from "./routes/interfaces/router.interface";
import {AuthRouter} from "./routes/auth.router";

export function setupRoutes(app: express.Application) {
    const routes: any = [];
    routes.push(new ProductRouter(app));
    routes.push(new AuthRouter(app));
    routes.forEach((route: RouterInterface) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
}