import {Db, MongoClient} from "mongodb";
import {DbConnectorInterface} from "./interfaces/db.connector.interface";
import {Service} from "typedi";
import {MongodbConnectorFactory} from "./factory/mongodb.connector.factory";

@Service({factory: [MongodbConnectorFactory, 'create']})
export class MongoDBConnector implements DbConnectorInterface {
    private _db?: Db;
    private _client?: MongoClient;

    constructor(private url: string, private dbName: string) {
    }

    /**
     * @inheritDoc
     */
    async getDb(): Promise<Db> {
        if (typeof this._db == 'undefined' || !this._db) {
            this._client = new MongoClient(this.url, {monitorCommands: true});
            await this._client.connect();
            this._db = this._client.db(this.dbName);
        }
        return this._db;
    }

    async closeConnection(): Promise<void> {
        if (typeof this._client !== 'undefined') {
            await this._client.close(true);
            this._db = undefined
        }
    }

    /**
     * @inheritDoc
     */
    async healthCheck(): Promise<boolean> {
        let connected: boolean = true;
        try {
            let db = await this.getDb();
            await db.admin().ping();
        } catch (e) {
            connected = false;
        }
        return connected;
    }

}