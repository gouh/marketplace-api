export interface ReadPaginationInterface<T> {
    /**
     * Paginate collection data
     * @param currentPage
     * @param limit
     */
    findByPage(currentPage: number, limit: number): Promise<T[]>;

    /**
     * Count items of collection
     */
    count(): Promise<number>;
}