import {Repository} from "./abstract.repository";
import {InsertOneResult, UpdateResult, ObjectId, Filter} from "mongodb";
import {Service} from "typedi";
import {UserRepositoryInterface} from "./interfaces/user.repository.interface";
import {User} from "../models/user";
import {UserRepositoryFactory} from "./factories/user.repository.factory";

@Service({factory: [UserRepositoryFactory, "create"]})
export class UserRepository extends Repository implements UserRepositoryInterface {
    /**
     * @inheritDoc
     */
    async create(item: User): Promise<User> {
        const collection = await this.getCollection();
        item.createdAt = new Date();
        const result: InsertOneResult = await collection.insertOne(item);
        await this.closeConnection();
        item._id = result.insertedId;
        return item;
    }

    async findBy(query: Filter<any>): Promise<User[]> {
        const collection = await this.getCollection();
        let users: User[] = await collection.find<User>(query).toArray();
        await this.closeConnection();
        return users;
    }

    /**
     * @inheritDoc
     */
    async findOne(id: string): Promise<User> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id.trim())};
        let user: User = await collection.findOne<User>(query) as User;
        await this.closeConnection();
        return user;
    }

    /**
     * @inheritDoc
     */
    async update(id: string, item: User): Promise<boolean> {
        const collection = await this.getCollection();
        const query = {_id: new ObjectId(id)};
        item.updatedAt = new Date();
        const result: UpdateResult = await collection.updateOne(query, {$set: item});
        await this.closeConnection();
        return result.acknowledged;
    }
}