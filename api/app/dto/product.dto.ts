import {IsNumber, IsString} from "class-validator";

export interface ProductDto {
    id?: string;
    sku: string;
    name: string;
    price: number;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductFilter {
    name: string | null;
    sku: string | null;
    priceMin: string | null;
    priceMax: string | null;
    userId: string | null;
}

export class ProductDto implements ProductDto {
    @IsString()
    sku: string;
    @IsString()
    name: string;
    @IsNumber()
    price: number;
}