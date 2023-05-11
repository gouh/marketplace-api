import {ProductDto} from "../../dto/product.dto";
import {ParsedQs} from "qs";

export interface ProductServiceInterface {
    /**
     * Get a products count
     * @param filter
     */
    countItems(filter: object): Promise<number>;

    /**
     * Get a filter for pagination
     * @param queryParams
     * @param userId
     * @param isAdmin
     */
    getFilter(queryParams: ParsedQs, userId: string, isAdmin: boolean): object;

    /**
     * Get pagination by public, owner or admin
     * @param productFiler
     * @param currentPage
     * @param limit
     */
    getPagination(productFiler: object, currentPage: number, limit: number): Promise<ProductDto[]>;

    /**
     * Get one item by public, owner or admin
     * @param id
     * @param userId
     * @param isAdmin
     */
    getOne(id: string, userId: string, isAdmin: boolean): Promise<ProductDto>;

    /**
     * Create a new item
     * @param productDto
     */
    create(productDto: ProductDto): Promise<ProductDto>;

    /**
     * Update item
     * @param id
     * @param productDto
     * @param isAdmin
     */
    update(id: string, productDto: ProductDto, isAdmin: boolean): Promise<ProductDto>;

    /**
     * Delete item
     * @param id
     * @param userId
     * @param isAdmin
     */
    delete(id: string, userId: string, isAdmin: boolean): Promise<boolean>;
}