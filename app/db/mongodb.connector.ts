import {Db, MongoClient} from "mongodb";
import {DbConnectorInterface} from "./interfaces/db.connector.interface";
import {Service} from "typedi";
import {MongodbConnectorFactory} from "./factory/mongodb.connector.factory";

@Service({factory: [MongodbConnectorFactory, 'create']})
export class MongoDBConnector implements DbConnectorInterface {
    private _db?: Db;

    constructor(private url: string, private dbName: string) {
    }

    async getDb(): Promise<Db> {
        if (typeof this._db == 'undefined' || !this._db) {
            const client: MongoClient = new MongoClient(this.url);
            await client.connect();
            this._db = client.db(this.dbName);
        }
        return this._db;
    }

    async healthCheck(): Promise<boolean> {
        let connected: boolean = true;
        try {
            let db = await this.getDb()
            await db.admin().ping();
        } catch (e) {
            connected = false;
        }
        return connected;
    }

}