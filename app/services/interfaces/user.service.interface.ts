import {UserDto, UserRequestDto} from "../../dto/user.dto";

export interface UserServiceInterface {

    getAll(): Promise<UserDto[]>;

    getOne(id: string): Promise<UserDto>;

    create(userRequestDto: UserRequestDto): Promise<UserDto>;

    update(id: string, productDto: UserRequestDto): Promise<UserDto>;
}