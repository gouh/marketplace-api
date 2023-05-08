import {ReadInterface} from "./read.interface";
import {CreateInterfaceInterface} from "./create.interface";
import {UpdateInterfaceInterface} from "./update.interface";
import {User} from "../../models/user";
import {SearchInterface} from "./search.interface";

export interface UserRepositoryInterface extends ReadInterface<User>, CreateInterfaceInterface<User>, UpdateInterfaceInterface<User>, SearchInterface<User> {
}