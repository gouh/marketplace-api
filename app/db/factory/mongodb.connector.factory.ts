import {FactoryInterface} from "../../interfaces/factory.interface";
import {DbConnectorInterface} from "../interfaces/db.connector.interface";
import {MongoDBConnector} from "../mongodb.connector";
import {Container} from "typedi";

export class MongodbConnectorFactory implements FactoryInterface {
    create(): DbConnectorInterface {
        return new MongoDBConnector(
            Container.get('mongodb.url'),
            Container.get('mongodb.database'),
        )
    }
}