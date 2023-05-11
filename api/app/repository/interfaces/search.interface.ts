import {Filter} from "mongodb";

export interface SearchInterface<T> {
    /**
     * Find some item by attrs
     * @param query
     */
    findBy(query: Filter<any>): Promise<T[]>;
}