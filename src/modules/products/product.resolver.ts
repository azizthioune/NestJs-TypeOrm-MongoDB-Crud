import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import {
  ProductCreationResponse,
  ProductsFetchQueries,
} from './dto/fetch-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsService } from './product.service';
import Product from './schema/product.schema';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => ProductCreationResponse)
  async products(
    @Args('query', { nullable: true }) query: ProductsFetchQueries,
  ) {
    return this.productsService.products(query || {});
  }

  @Query((returns) => Product)
  async product(
    @Args('id', {
      type: () => ID,
    })
    id: string,
  ): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Mutation((returns) => Product)
  createProduct(
    @Args('input')
    input: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(input);
  }

  @Mutation((returns) => Product)
  updateProduct(
    @Args('id', {
      type: () => ID,
    })
    id: string,
    @Args('input')
    input: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update(id, input);
  }

  @Mutation((returns) => Product)
  deleteProduct(
    @Args('id', {
      type: () => ID,
    })
    id: string,
  ): Promise<Product> {
    return this.productsService.delete(id);
  }
}
