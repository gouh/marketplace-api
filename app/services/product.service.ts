import {ProductServiceInterface} from "./interfaces/product.service.interface";
import {Service} from "typedi";
import {ProductServiceFactory} from './factory/product.service.factory'
import {ProductRepositoryInterface} from "../repository/interfaces/product.repository.interface";
import {Product} from "../models/product";
import {ProductDtoMapper} from "../dto/mappers/product.dto.mapper";
import {ProductDto} from "../dto/product.dto";
import {ProductNotFoundError} from "./errors/product.not.found.error";
import {ObjectId} from "bson";
import {ParsedQs} from "qs";
import {ProductAlreadyExistError} from "./errors/product.already.exist.error";

@Service({factory: [ProductServiceFactory, "create"]})
export class ProductService implements ProductServiceInterface {
    constructor(private productRepository: ProductRepositoryInterface) {
    }

    async countItems(filter: object): Promise<number> {
        return await this.productRepository.count(filter);
    }

    async getOne(id: string, userId: string): Promise<ProductDto> {
        let dto: ProductDto;
        let result: Product = await this.productRepository.findOne(id);
        if (result && (userId && userId == result.userId.toString())) {
            dto = ProductDtoMapper.fromModelToDto(result)
        } else {
            throw new ProductNotFoundError();
        }
        return dto;
    }

    async getFilter(query: ParsedQs, userId: string, isAdmin: boolean): Promise<object> {
        let filter: any = {}
        let filterOr = [];

        if (typeof query.priceMin == 'string' || typeof query.priceMax == 'string') {
            let filterPrice: any = {};
            if (typeof query.priceMin == 'string') {
                filterPrice["$gte"] = parseFloat(query.priceMin);
            }
            if (typeof query.priceMax == 'string') {
                filterPrice["$lte"] = parseFloat(query.priceMax);
            }
            filterOr.push({"price": filterPrice});
        }

        if (typeof query.sku == 'string') {
            filterOr.push({"sku": new RegExp(query.sku, 'i')});
        }

        if (typeof query.name == 'string') {
            filterOr.push({"name": new RegExp(query.name, 'i')});
        }

        if (typeof query.seller != 'undefined' && isAdmin) {
            let sellers: (string | ParsedQs)[] = Array.isArray(query.seller) ? query.seller : [query.seller];
            let sellerObjects: ObjectId[] = [];
            for (let i = 0; i < sellers.length; i++) {
                sellerObjects[i] = new ObjectId(sellers[i].toString())
            }
            filter["$and"] = [{"userId": {"$in": sellerObjects}}];
        }

        if (filterOr.length > 0) {
            filter["$or"] = filterOr;
        }

        if (userId.length > 0 && !isAdmin) {
            filter["userId"] = new ObjectId(userId);
        }

        return filter;
    }

    async getPagination(productFilter: object, currentPage: number, limit: number): Promise<ProductDto[]> {
        let result: Product[] = await this.productRepository.findByPage(productFilter, currentPage, limit);
        return ProductDtoMapper.fromArrayModelToDto(result);
    }

    async create(product: ProductDto): Promise<ProductDto> {
        let products: Product[] = await this.productRepository.findBy({"sku": product.sku, userId: product.userId});
        if (products.length > 0){
            throw new ProductAlreadyExistError()
        }
        let result: Product = await this.productRepository.create(ProductDtoMapper.dtoToModel(product))
        return ProductDtoMapper.fromModelToDto(result)
    }

    async update(id: string, productUpdate: ProductDto): Promise<ProductDto> {
        let products: Product[] = await this.productRepository.findBy({"_id": id, userId: productUpdate.userId});
        if (products.length > 0) {
            let product = products[0]
            product.sku = productUpdate.sku;
            product.name = productUpdate.name;
            product.price = productUpdate.price;
            let isUpdated: boolean = await this.productRepository.update(id, product)
            if (isUpdated) {
                productUpdate = ProductDtoMapper.fromModelToDto(product)
            }
        } else {
            throw new ProductNotFoundError();
        }
        return productUpdate
    }

    async delete(id: string, userId: string): Promise<boolean> {
        let products: Product[] = await this.productRepository.findBy({"_id": id, userId: userId});
        let isDeleted: boolean = true;
        if (products.length > 0) {
            isDeleted = await this.productRepository.delete(id);
        } else {
            throw new ProductNotFoundError();
        }
        return isDeleted;
    }
}