import {UserDto, UserRequestDto} from "../../dto/user.dto";

export interface UserServiceInterface {
    /**
     * Get all users
     */
    getAll(): Promise<UserDto[]>;

    /**
     * Get one user
     * @param id
     */
    getOne(id: string): Promise<UserDto>;

    /**
     * Create new user
     * @param userRequestDto
     */
    create(userRequestDto: UserRequestDto): Promise<UserDto>;

    /**
     * Update an user
     * @param id
     * @param productDto
     */
    update(id: string, productDto: UserRequestDto): Promise<UserDto>;
}