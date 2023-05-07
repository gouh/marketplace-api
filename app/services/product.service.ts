import {ProductServiceInterface} from "./interfaces/product.service.interface";
import {Service} from "typedi";
import {ProductServiceFactory} from './factory/product.service.factory'
import {ProductRepositoryInterface} from "../repository/interfaces/product.repository.interface";
import {Product} from "../models/product";
import {ProductDtoMapper} from "../dto/mappers/product.dto.mapper";
import {ProductDto} from "../dto/request.product.dto";
import {ProductNotFoundError} from "./errors/product.not.found.error";

@Service({factory: [ProductServiceFactory, "create"]})
export class ProductService implements ProductServiceInterface {
    constructor(private productRepository: ProductRepositoryInterface) {
    }

    async countItems(): Promise<number> {
        return await this.productRepository.count();
    }

    async getOne(id: string): Promise<ProductDto> {
        let dto: ProductDto;
        let result: Product = await this.productRepository.findOne(id);
        if (result) {
            dto = ProductDtoMapper.fromModelToDto(result)
        } else {
            throw new ProductNotFoundError();
        }
        return dto;
    }

    async getPagination(currentPage: number, limit: number): Promise<ProductDto[]> {
        let result: Product[] = await this.productRepository.findByPage(currentPage, limit);
        return ProductDtoMapper.fromArrayModelToDto(result);
    }

    async create(product: ProductDto): Promise<ProductDto> {
        let result: Product = await this.productRepository.create(ProductDtoMapper.dtoToModel(product))
        return ProductDtoMapper.fromModelToDto(result)
    }

    async update(id: string, productUpdate: ProductDto): Promise<ProductDto> {
        let product: Product = await this.productRepository.findOne(id);
        if (product) {
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

    async delete(id: string): Promise<boolean> {
        let product: Product = await this.productRepository.findOne(id);
        let isDeleted: boolean = true;
        if (product) {
            isDeleted = await this.productRepository.delete(id);
        } else {
            throw new ProductNotFoundError();
        }
        return isDeleted;
    }
}