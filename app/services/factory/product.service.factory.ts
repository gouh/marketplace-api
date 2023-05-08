import {Container} from "typedi";
import {ProductServiceInterface} from "../interfaces/product.service.interface";
import {ProductService} from "../product.service";
import {FactoryInterface} from "../../interfaces/factory.interface";
import {ProductRepository} from "../../repository/product.repository";

export class ProductServiceFactory implements FactoryInterface {
    create(): ProductServiceInterface {
        return new ProductService(
            Container.get(ProductRepository)
        );
    }
}

