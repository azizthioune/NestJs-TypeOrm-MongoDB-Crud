import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { paginatedType } from 'src/common/pagination';
import Product from '../schema/product.schema';

@InputType()
export class ProductsFetchQueries {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;
}

@ObjectType()
export class ProductCreationResponse extends paginatedType(Product) {}
