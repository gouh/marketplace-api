export interface ReadInterface<T> {
    /**
     * Find one item by id
     * @param id
     */
    findOne(id: string): Promise<T>;
}