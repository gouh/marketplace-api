export interface DbConnectorInterface {
    getDb(): Promise<any>;

    healthCheck(): Promise<boolean>;
}