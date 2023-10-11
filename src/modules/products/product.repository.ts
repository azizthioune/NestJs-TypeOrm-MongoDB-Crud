import { EntityRepository, MongoRepository } from 'typeorm';
import Product from './schema/product.schema';

@EntityRepository(Product)
export class ProductRepository extends MongoRepository<Product> {}
