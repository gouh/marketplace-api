import {Filter} from "mongodb";

export interface SearchInterface<T> {
    findBy(query: Filter<any>): Promise<T[]>;
}