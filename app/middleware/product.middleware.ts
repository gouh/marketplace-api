import express from "express";
import {validationPipe} from "./validation/validation";
import {ProductDto} from "../dto/product.dto";
import {getResponse} from "../controllers/helpers/response.helper";
import {StatusCodes} from "http-status-codes";
import {ObjectId} from "bson";

const invalidProductMessage = "Invalid product";
const invalidProductIdMessage = "Invalid id";

export class ProductMiddleware {
    private static instance: ProductMiddleware;

    static getInstance() {
        if (!ProductMiddleware.instance) {
            ProductMiddleware.instance = new ProductMiddleware();
        }
        return ProductMiddleware.instance;
    }

    /**
     * Validate id of some product
     * @param req
     * @param res
     * @param next
     */
    async validateId(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            new ObjectId(req.params.id)
            next();
        } catch (e) {
            return getResponse(res, StatusCodes.BAD_REQUEST, null, invalidProductIdMessage, []);
        }
    }

    /**
     * Validate product in request
     * @param req
     * @param res
     * @param next
     */
    async validateProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
        const result: any = await validationPipe(ProductDto, {...req.body});
        if (result === true) {
            next();
        } else {
            return getResponse(res, StatusCodes.BAD_REQUEST, null, invalidProductMessage, result);
        }
    }

    /**
     * Transform request to dto
     * @param req
     * @param res
     * @param next
     */
    async mapProductToDto(req: express.Request, res: express.Response, next: express.NextFunction) {
        const product = req.body;
        req.body.product = {
            sku: product.sku || null,
            name: product.name || null,
            price: product.price || null,
        };
        next();
    }
}

