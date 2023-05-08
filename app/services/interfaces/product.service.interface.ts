import {ProductDto} from "../../dto/product.dto";
import {ParsedQs} from "qs";

export interface ProductServiceInterface {
    countItems(filter: object): Promise<number>;

    getFilter(queryParams: ParsedQs, userId: string, isAdmin: boolean): object;

    getPagination(productFiler: object, currentPage: number, limit: number): Promise<ProductDto[]>;

    getOne(id: string, userId: string): Promise<ProductDto>;

    create(productDto: ProductDto): Promise<ProductDto>;

    update(id: string, productDto: ProductDto): Promise<ProductDto>;

    delete(id: string, userId: string): Promise<boolean>;
}