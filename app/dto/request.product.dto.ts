import {IsNumber, IsString} from "class-validator";

export interface ProductDto {
    id?: string;
    sku: string;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class RequestProductDto implements ProductDto {
    @IsString()
    sku: string;
    @IsString()
    name: string;
    @IsNumber()
    price: number;
}