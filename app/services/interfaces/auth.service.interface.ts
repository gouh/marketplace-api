import {TokenDto, UserRequestDto} from "../../dto/user.dto";

export interface AuthServiceInterface {
    login(user: UserRequestDto): Promise<TokenDto>;
}