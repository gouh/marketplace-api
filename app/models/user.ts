import {Timestamp} from "./timestamp";
import {ObjectId} from "bson";

export interface User extends Timestamp {
    _id: ObjectId;
    email: string;
    password: string;
    isAdmin: boolean;
}