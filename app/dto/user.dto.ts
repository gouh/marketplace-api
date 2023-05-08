import {IsBoolean, IsOptional, IsString} from "class-validator";
import {Timestamp} from "../models/timestamp";

export interface UserDtoType {
    isAdmin?: boolean;
}

export interface UserDtoPasswordRequest {
    password: string;
}

export interface UserDtoEmailRequest {
    email: string;
}

export interface UserRequestDto extends UserDtoPasswordRequest, UserDtoEmailRequest, UserDtoType {

}

export interface UserDto extends Timestamp, UserDtoEmailRequest, UserDtoType {
    id: string;
}

export interface TokenDto {
    token: string;
}

export class UserRequestDto implements UserRequestDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}

export class UserPayloadDto implements UserDto {
    @IsString()
    id: string;
    @IsString()
    email: string;
    @IsBoolean()
    isAdmin: boolean;
}