import {Timestamp} from "./timestamp";
import {ObjectId} from "bson";

export interface Product extends Timestamp {
    _id: ObjectId;
    name: string;
    sku: string;
    price: number;
    userId: ObjectId;
}