export interface CreateInterfaceInterface<T> {
    /**
     * Create a new item
     * @param item
     */
    create(item: T): Promise<T>;
}