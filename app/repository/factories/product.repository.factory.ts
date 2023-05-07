import {FactoryInterface} from "../../interfaces/factory.interface";
import {ProductRepositoryInterface} from "../interfaces/product.repository.interface";
import {ProductRepository} from "../product.repository";
import {MongoDBConnector} from "../../db/mongodb.connector";
import {Container} from "typedi";

export class ProductRepositoryFactory implements FactoryInterface {
    private collectionName: string = "product";

    create(): ProductRepositoryInterface {
        return new ProductRepository(
            Container.get(MongoDBConnector),
            this.collectionName
        );
    }
}