import {FactoryInterface} from "../../interfaces/factory.interface";
import {MongoDBConnector} from "../../db/mongodb.connector";
import {Container} from "typedi";
import {UserRepositoryInterface} from "../interfaces/user.repository.interface";
import {UserRepository} from "../user.repository";

export class UserRepositoryFactory implements FactoryInterface {
    private collectionName: string = "Users";

    create(): UserRepositoryInterface {
        return new UserRepository(
            Container.get(MongoDBConnector),
            this.collectionName
        );
    }
}