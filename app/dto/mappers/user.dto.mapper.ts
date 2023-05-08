import {UserDto, UserRequestDto} from "../user.dto";
import {ObjectId} from "bson";
import {User} from "../../models/user";

export class UserDtoMapper {
    static dtoToModel(user: UserRequestDto): User {
        return {
            _id: new ObjectId(),
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
        }
    }

    static fromModelToDto(model: User): UserDto {
        return {
            id: model._id ? model._id.toString() : "",
            email: model.email,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        }
    }

    static fromArrayModelToDto(models: User[]): UserDto[] {
        let users: UserDto[] = [];
        for (let i = 0; i < models.length; i++) {
            users.push(UserDtoMapper.fromModelToDto(models[i]))
        }
        return users
    }
}