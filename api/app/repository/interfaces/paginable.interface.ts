export interface ReadPaginationInterface<T> {
    /**
     * Paginate collection data
     * @param filter
     * @param currentPage
     * @param limit
     */
    findByPage(filter: object, currentPage: number, limit: number): Promise<T[]>;

    /**
     * Count items of collection
     */
    count(filter: object): Promise<number>;
}