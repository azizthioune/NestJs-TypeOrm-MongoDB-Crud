import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common';
import { operationType, paginate } from 'src/common/pagination';

import Post from './schema/product.schema';
import { ProductRepository } from './product.repository';
import Product from './schema/product.schema';
import { ProductsFetchQueries } from './dto/fetch-product.input';
import { CreateProductInput } from './dto/create-product.input';
import { ObjectLiteral } from 'typeorm';

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
      repo: this.productRepo,
      query: {
        isDeleted: false,
      },
      pipeline: [
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ],
      page,
      offset,
      limit,
      type: operationType.Aggregate,
    });
  }

  async createProduct(payload: CreateProductInput): Promise<Product> {
    return super.create(payload);
  }
}
