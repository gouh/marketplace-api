import {UserDto, UserRequestDto} from "../../dto/user.dto";

export interface UserServiceInterface {

    getOne(id: string): Promise<UserDto>;

    create(userRequestDto: UserRequestDto): Promise<UserDto>;

    update(id: string, productDto: UserRequestDto): Promise<UserDto>;
}