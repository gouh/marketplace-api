import {Product} from "../models/product";
import {Repository} from "./abstract.repository";
import {ProductRepositoryInterface} from "./interfaces/product.repository.interface";
import {DeleteResult, InsertOneResult, UpdateResult, ObjectId} from "mongodb";
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
        return result.acknowledged
    }

    /**
     * @inheritDoc
     */
    async count(): Promise<number> {
        const collection = await this.getCollection();
        return await collection.countDocuments();
    }

    /**
     * @inheritDoc
     */
    async findByPage(currentPage: number, limit: number): Promise<Product[]> {
        let skip = currentPage < 0 ? 0 : (currentPage - 1);
        const collection = await this.getCollection();
        return await collection
            .find<Product>({})
            .limit(limit)
            .skip(skip * limit)
            .sort('_id', 'desc')
            .toArray()
    }

    /**
     * @inheritDoc
     */
    async findOne(id: string): Promise<Product> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id.trim())};
        return await collection.findOne<Product>(query) as Product
    }

    /**
     * @inheritDoc
     */
    async update(id: string, item: Product): Promise<boolean> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id)};
        item.updatedAt = new Date();
        const result: UpdateResult = await collection.updateOne(query, {$set: item});
        return result.acknowledged
    }
}