import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common';
import { paginate } from 'src/common/pagination';

import Post from './schema/product.schema';
import { ProductRepository } from './product.repository';
import Product from './schema/product.schema';
import { ProductsFetchQueries } from './dto/fetch-product.input';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductsService extends AbstractService<Product> {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepo: ProductRepository,
  ) {
    super(productRepo);
  }

  async products({ limit, page, offset }: ProductsFetchQueries) {
    return paginate({
      repo: this.repo,
      page,
      offset,
      limit,
    });
  }

  async createProduct(payload: CreateProductInput): Promise<Product> {
    return super.create(payload);
  }
}
