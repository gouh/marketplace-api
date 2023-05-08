import {ProductDto} from "../product.dto";
import {Product} from "../../models/product";
import {ObjectId} from "bson";

export class ProductDtoMapper {
    static dtoToModel(product: ProductDto): Product {
        return {
            _id: new ObjectId(),
            sku: product.sku,
            name: product.name,
            price: product.price,
            userId: product.userId ? new ObjectId(product.userId) : new ObjectId(""),
        }
    }

    static fromModelToDto(model: Product): ProductDto {
        return {
            id: model._id ? model._id.toString() : "",
            sku: model.sku,
            name: model.name,
            price: model.price,
            userId: model.userId.toString(),
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        }
    }

    static fromArrayModelToDto(models: Product[]): ProductDto[] {
        let products: ProductDto[] = [];
        for (let i = 0; i < models.length; i++) {
            products.push(ProductDtoMapper.fromModelToDto(models[i]))
        }
        return products
    }
}