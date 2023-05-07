export interface WriteInterface<T> {
    /**
     * Create a new item
     * @param item
     */
    create(item: T): Promise<T>;

    /**
     * Update an existing item
     * @param id
     * @param item
     */
    update(id: string, item: T): Promise<boolean>;

    /**
     * Delete an item
     * @param id
     */
    delete(id: string): Promise<boolean>;
}