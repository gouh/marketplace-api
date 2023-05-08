import express, {Router} from "express";
import {ProductRouter} from "./routes/product.router";
import {RouterInterface} from "./routes/interfaces/router.interface";
import {AuthRouter} from "./routes/auth.router";
import {SellerRouter} from "./routes/seller.router";

export function setupRoutes(app: express.Application) {
    const routes: any = [];
    let router = Router();
    routes.push(new ProductRouter(router));
    routes.push(new AuthRouter(router));
    routes.push(new SellerRouter(router));
    app.use('/api/v1',  router)
    routes.forEach((route: RouterInterface) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
}