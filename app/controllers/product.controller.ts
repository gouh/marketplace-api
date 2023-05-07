import express from "express";
import {ProductService} from "../services/product.service";
import {Container} from "typedi";
import {ProductServiceInterface} from "../services/interfaces/product.service.interface";
import {calcPagination, getResponse, getResponsePagination} from "./helpers/response.helper";
import {ProductDto} from "../dto/request.product.dto";
import {StatusCodes} from "http-status-codes";
import {ProductNotFoundError} from "../services/errors/product.not.found.error";

const GotProductsMessage: string = 'List products';
const ProductSavedMessage: string = 'Product saved';
const ProductUpdatedMessage: string = 'Product updated';
const ProductDeletedMessage: string = 'Product deleted';
const ProductNotFoundMessage: string = 'Product not found';

export class ProductController {
    async getAll(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            const limit: number = typeof req.query.limit != 'undefined' ? parseInt(<string>req.query.limit) : 50;
            const page: number = typeof req.query.page != 'undefined' ? parseInt(<string>req.query.page) : 1;
            const totalItems: number = await productService.countItems();
            const products: ProductDto[] = await productService.getPagination(page, limit);
            let pagination = calcPagination(page, products.length, totalItems, limit);
            return getResponsePagination(res, products, pagination, GotProductsMessage);
        } catch (err) {
            return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
        }
    }

    async getOne(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            const product = await productService.getOne(req.params.id);
            return getResponse(res, StatusCodes.OK, product, ProductSavedMessage);
        } catch (err) {
            if (err instanceof ProductNotFoundError) {
                return getResponse(res, StatusCodes.NOT_FOUND, null, ProductNotFoundMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }

    async create(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            const product = req.body.product as ProductDto
            const storedProduct: ProductDto = await productService.create(product);
            return getResponse(res, StatusCodes.CREATED, storedProduct, ProductSavedMessage);
        } catch (err) {
            return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
        }
    }

    async update(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            const productUpdate = req.body.product as ProductDto
            const storedProduct: ProductDto = await productService.update(req.params.id, productUpdate);
            return getResponse(res, StatusCodes.OK, storedProduct, ProductUpdatedMessage);
        } catch (err) {
            if (err instanceof ProductNotFoundError) {
                return getResponse(res, StatusCodes.NOT_FOUND, null, ProductNotFoundMessage);
            } else {
                return getResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "", [<string>err]);
            }
        }
    }

    async delete(req: express.Request, res: express.Response) {
        let productService: ProductServiceInterface = Container.get(ProductService);
        try {
            await productService.delete(req.params.id);
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
