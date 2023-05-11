import {Product} from "../models/product";
import {Repository} from "./abstract.repository";
import {ProductRepositoryInterface} from "./interfaces/product.repository.interface";
import {DeleteResult, InsertOneResult, UpdateResult, ObjectId, Filter} from "mongodb";
import {Service} from "typedi";
import {ProductRepositoryFactory} from "./factories/product.repository.factory";

@Service({factory: [ProductRepositoryFactory, "create"]})
export class ProductRepository extends Repository implements ProductRepositoryInterface {
    /**
     * @inheritDoc
     */
    async create(item: Product): Promise<Product> {
        const collection = await this.getCollection();
        item.createdAt = new Date();
        const result: InsertOneResult = await collection.insertOne(item);
        await this.closeConnection();
        item._id = result.insertedId;
        return item;
    }

    /**
     * @inheritDoc
     */
    async delete(id: string): Promise<boolean> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id.trim())};
        const result: DeleteResult = await collection.deleteOne(query);
        await this.closeConnection();
        return result.acknowledged;
    }

    /**
     * @inheritDoc
     */
    async count(filter: object): Promise<number> {
        const collection = await this.getCollection();
        let totalProducts: number = await collection.find<Product>(filter).count();
        await this.closeConnection();
        return totalProducts;
    }

    async findBy(query: Filter<any>): Promise<Product[]> {
        const collection = await this.getCollection();
        let results: Product[] = await collection.find<Product>(query).toArray();
        await this.closeConnection();
        return results;
    }

    /**
     * @inheritDoc
     */
    async findByPage(filter: object, currentPage: number, limit: number): Promise<Product[]> {
        let skip = currentPage < 0 ? 0 : (currentPage - 1);
        const collection = await this.getCollection();
        let pagination: Product[] = await collection
            .find<Product>(filter)
            .limit(limit)
            .skip(skip * limit)
            .sort('_id', 'desc')
            .toArray();
        await this.closeConnection();
        return pagination;
    }

    /**
     * @inheritDoc
     */
    async findOne(id: string): Promise<Product> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id.trim())};
        let product: Product = await collection.findOne<Product>(query) as Product
        await this.closeConnection();
        return product;
    }

    /**
     * @inheritDoc
     */
    async update(id: string, item: Product): Promise<boolean> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id)};
        item.updatedAt = new Date();
        const result: UpdateResult = await collection.updateOne(query, {$set: item});
        await this.closeConnection();
        return result.acknowledged
    }
}