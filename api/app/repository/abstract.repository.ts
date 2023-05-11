import {Db, Collection} from 'mongodb';
import {DbConnectorInterface} from "../db/interfaces/db.connector.interface";

export abstract class Repository {
    constructor(private dbConnection: DbConnectorInterface, private collectionName: string) {
    }

    /**
     * Connect to database and get collection
     */
    async getCollection(): Promise<Collection> {
        let db = await this.dbConnection.getDb() as Db;
        return db.collection(this.collectionName);
    }

    /**
     * Close mongodb connection
     */
    async closeConnection(): Promise<void> {
        await this.dbConnection.closeConnection()
    }
}