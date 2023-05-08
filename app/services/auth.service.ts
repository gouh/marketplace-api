import jwt from 'jsonwebtoken';
import CryptoJs from "crypto-js";
import HmacSHA256 from "crypto-js/hmac-sha256";
import {User} from "../models/user";
import {TokenDto, UserRequestDto} from "../dto/user.dto";
import {UserRepositoryInterface} from "../repository/interfaces/user.repository.interface";
import {Service} from "typedi";
import {AuthServiceFactory} from "./factory/auth.service.factory";
import {AuthServiceInterface} from "./interfaces/auth.service.interface";
import {UserPasswordError} from "./errors/user.password.error";

@Service({factory: [AuthServiceFactory, "create"]})
export class AuthService implements AuthServiceInterface {
    constructor(private userRepository: UserRepositoryInterface, private passwordKey: string, private jwtSecret: string) {
    }

    signJwt(payload: object): string {
        return jwt.sign(payload, this.jwtSecret, {expiresIn: '1h'});
    }

    async login(user: UserRequestDto): Promise<TokenDto> {
        let results = await this.userRepository.findBy({email: user.email})
        if (results.length == 0) {
            throw new UserPasswordError();
        }
        let userDb: User = results[0];
        let encrypted = CryptoJs.enc.Base64.stringify(HmacSHA256(user.password, this.passwordKey))
        if (userDb.password != encrypted) {
            throw new UserPasswordError();
        }
        return {
            token: this.signJwt({
                id: userDb._id.toString(),
                email: userDb.email,
                isAdmin: userDb.isAdmin,
            })
        }
    }
}