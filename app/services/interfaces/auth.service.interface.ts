import {TokenDto, UserRequestDto} from "../../dto/user.dto";

export interface AuthServiceInterface {
    /**
     * Login user
     * @param user
     */
    login(user: UserRequestDto): Promise<TokenDto>;
}