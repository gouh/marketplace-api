export interface UpdateInterfaceInterface<T> {
    /**
     * Update an item
     * @param id
     * @param item
     */
    update(id: string, item: T): Promise<boolean>;
}