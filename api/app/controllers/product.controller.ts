import express from "express";
import {ProductService} from "../services/product.service";
import {Container} from "typedi";
import {ProductServiceInterface} from "../services/interfaces/product.service.interface";
import {calcPagination, getResponse, getResponsePagination} from "./helpers/response.helper";
import {ProductDto} from "../dto/product.dto";
import {StatusCodes} from "http-status-codes";
import {ProductNotFoundError} from "../services/errors/product.not.found.error";
import {ProductAlreadyExistError} from "../services/errors/product.already.exist.error";

const GotProductsMessage: string = 'List products';
const ProductSavedMessage: string = 'Product saved';
const ProductUpdatedMessage: string = 'Product updated';
const ProductDeletedMessage: string = 'Product deleted';
const ProductNotFoundMessage: string = 'Product not found';
const ProductAlreadyExistMessage: string = 'Sku already exist';

export class ProductController {
    /**
     * Get all products with a pagination
     * @param req
     * @param res
     */
    async getAll(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            const isAdmin = req.body.userPayload ? req.body.userPayload.isAdmin : false;
            const userId = req.body.userPayload ? req.body.userPayload.id : "";
            const limit: number = typeof req.query.limit != 'undefined' ? parseInt(<string>req.query.limit) : 50;
            const page: number = typeof req.query.page != 'undefined' ? parseInt(<string>req.query.page) : 1;
            const filter: object = await productService.getFilter(req.query, userId, isAdmin);
            const totalItems: number = await productService.countItems(filter);
            const products: ProductDto[] = await productService.getPagination(filter, page, limit);
            let pagination = calcPagination(page, products.length, totalItems, limit);
            return getResponsePagination(res, products, pagination, GotProductsMessage);
        } catch (err) {
            return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
        }
    }

    /**
     * Get product by id
     * @param req
     * @param res
     */
    async getOne(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            const isAdmin = req.body.userPayload ? req.body.userPayload.isAdmin : false;
            const userId = req.body.userPayload ? req.body.userPayload.id : "";
            const product = await productService.getOne(req.params.id, userId, isAdmin);
            return getResponse(res, StatusCodes.OK, product, ProductSavedMessage);
        } catch (err) {
            if (err instanceof ProductNotFoundError) {
                return getResponse(res, StatusCodes.NOT_FOUND, null, ProductNotFoundMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }

    /**
     * Create a new product
     * @param req
     * @param res
     */
    async create(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            let product = req.body.product as ProductDto
            product.userId = req.body.userPayload.id;
            const storedProduct: ProductDto = await productService.create(product);
            return getResponse(res, StatusCodes.CREATED, storedProduct, ProductSavedMessage);
        } catch (err) {
            if (err instanceof ProductAlreadyExistError) {
                return getResponse(res, StatusCodes.BAD_REQUEST, null, ProductAlreadyExistMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }

    /**
     * Update a product
     * @param req
     * @param res
     */
    async update(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            let productUpdate = req.body.product as ProductDto
            productUpdate.userId = req.body.userPayload.id;
            const storedProduct: ProductDto = await productService.update(req.params.id, productUpdate, req.body.userPayload.isAdmin);
            return getResponse(res, StatusCodes.OK, storedProduct, ProductUpdatedMessage);
        } catch (err) {
            if (err instanceof ProductNotFoundError) {
                return getResponse(res, StatusCodes.NOT_FOUND, null, ProductNotFoundMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }

    /**
     * Delete a product
     * @param req
     * @param res
     */
    async delete(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            await productService.delete(req.params.id, req.body.userPayload.id, req.body.userPayload.isAdmin);
            return getResponse(res, StatusCodes.NO_CONTENT, {}, ProductDeletedMessage);
        } catch (err) {
            if (err instanceof ProductNotFoundError) {
                return getResponse(res, StatusCodes.NOT_FOUND, null, ProductNotFoundMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }
}
