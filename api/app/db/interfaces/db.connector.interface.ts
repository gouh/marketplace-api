export interface DbConnectorInterface {
    /**
     * Get a db instance for operations
     */
    getDb(): Promise<any>;

    /**
     * Close connection
     */
    closeConnection(): Promise<any>;

    /**
     * Check if connection is ok
     */
    healthCheck(): Promise<boolean>;
}