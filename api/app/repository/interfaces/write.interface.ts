import {CreateInterfaceInterface} from "./create.interface";
import {UpdateInterfaceInterface} from "./update.interface";

export interface WriteInterface<T> extends CreateInterfaceInterface<T>, UpdateInterfaceInterface<T> {
    /**
     * Delete an item
     * @param id
     */
    delete(id: string): Promise<boolean>;
}