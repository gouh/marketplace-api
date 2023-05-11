import {Container} from "typedi";
import {FactoryInterface} from "../../interfaces/factory.interface";
import {UserRepository} from "../../repository/user.repository";
import {UserService} from "../user.service";
import {UserServiceInterface} from "../interfaces/user.service.interface";

export class UserServiceFactory implements FactoryInterface {
    create(): UserServiceInterface {
        return new UserService(
            Container.get(UserRepository),
            Container.get("password.key"),
        );
    }
}

