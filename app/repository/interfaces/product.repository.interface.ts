import {ReadInterface} from "./read.interface";
import {Product} from "../../models/product";
import {WriteInterface} from "./write.interface";
import {ReadPaginationInterface} from "./paginable.interface";

export interface ProductRepositoryInterface extends ReadInterface<Product>, WriteInterface<Product>, ReadPaginationInterface<Product> {
}