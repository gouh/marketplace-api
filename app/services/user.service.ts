import {Service} from "typedi";
import {UserRepositoryInterface} from "../repository/interfaces/user.repository.interface";
import {UserDtoMapper} from "../dto/mappers/user.dto.mapper";
import {UserDto, UserRequestDto} from "../dto/user.dto";
import {UserNotFoundError} from "./errors/user.not.found.error";
import {UserServiceInterface} from "./interfaces/user.service.interface";
import {User} from "../models/user";
import {UserServiceFactory} from "./factory/user.service.factory";
import {UserAlreadyExistError} from "./errors/user.already.exist.error";
import CryptoJs from "crypto-js";
import HmacSHA256 from "crypto-js/hmac-sha256";

@Service({factory: [UserServiceFactory, "create"]})
export class UserService implements UserServiceInterface {
    constructor(private userRepository: UserRepositoryInterface, private passwordKey: string) {
    }

    async getAll(): Promise<UserDto[]> {
        let result: User[] = await this.userRepository.findBy({});
        return UserDtoMapper.fromArrayModelToDto(result)
    }

    async getOne(id: string): Promise<UserDto> {
        let dto: UserDto;
        let result: User = await this.userRepository.findOne(id);
        if (result) {
            dto = UserDtoMapper.fromModelToDto(result)
        } else {
            throw new UserNotFoundError();
        }
        return dto;
    }

    async create(user: UserRequestDto): Promise<UserDto> {
        let results = await this.userRepository.findBy({email: user.email})
        if (results.length) {
            throw new UserAlreadyExistError();
        }
        let encrypted = HmacSHA256(user.password, this.passwordKey);
        user.password = CryptoJs.enc.Base64.stringify(encrypted);
        let result: User = await this.userRepository.create(UserDtoMapper.dtoToModel(user))
        return UserDtoMapper.fromModelToDto(result)
    }

    async update(id: string, userUpdate: UserRequestDto): Promise<UserDto> {
        let user: User = await this.userRepository.findOne(id);
        let userUpdated: UserDto = {email: "", id: "", isAdmin: false};
        if (user) {
            user.email = userUpdate.email;
            user.password = userUpdate.password;
            let isUpdated: boolean = await this.userRepository.update(id, user)
            if (isUpdated) {
                userUpdated = UserDtoMapper.fromModelToDto(user)
            }
        } else {
            throw new UserNotFoundError();
        }
        return userUpdated;
    }
}