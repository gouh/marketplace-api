import {Container} from "typedi";
import {FactoryInterface} from "../../interfaces/factory.interface";
import {UserRepository} from "../../repository/user.repository";
import {AuthService} from "../auth.service";
import {AuthServiceInterface} from "../interfaces/auth.service.interface";

export class AuthServiceFactory implements FactoryInterface {
    create(): AuthServiceInterface {
        return new AuthService(
            Container.get(UserRepository),
            Container.get("password.key"),
            Container.get("jwt.secret"),
        );
    }
}

