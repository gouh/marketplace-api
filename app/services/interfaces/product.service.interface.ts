import {Product} from "../../models/product";
import {ProductDto} from "../../dto/request.product.dto";

export interface ProductServiceInterface {
    countItems(): Promise<number>;

    getPagination(currentPage: number, limit: number): Promise<ProductDto[]>;

    getOne(id: string): Promise<ProductDto>;

    create(productDto: ProductDto): Promise<ProductDto>;

    update(id: string, productDto: ProductDto): Promise<ProductDto>;

    delete(id: string): Promise<boolean>;
}