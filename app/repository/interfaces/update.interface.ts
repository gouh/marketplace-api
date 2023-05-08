export interface UpdateInterfaceInterface<T> {
    /**
     * Create a new item
     * @param id
     * @param item
     */
    update(id: string, item: T): Promise<boolean>;
}