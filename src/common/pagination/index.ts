import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MongoRepository, ObjectLiteral } from 'typeorm';
import { BaseSchema } from '../schemas';

export enum operationType {
  Find = 'FIND',
  Aggregate = 'AGGREGATE',
}

const LIMIT = 1000;
const PAGE = 1;

interface offsetArgs<T> {
  repo: MongoRepository<T>;
  query?: ObjectLiteral;
  pipeline?: ObjectLiteral[];
  type?: operationType;
  page?: number;
  limit?: number;
  offset?: number;
}

export interface IPaginatedType<T> {
  totalPages: number;
  data: T[];
  countTotal: number;
  currentPage: number;
}

export function paginatedType<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => Int, { nullable: true })
    countTotal: number;
    @Field(() => Int, { nullable: true })
    currentPage: number;
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    data: T[];
    @Field(() => Int, { nullable: true })
    totalPages: number;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}

export async function paginate<T extends BaseSchema>({
  repo,
  query,
  pipeline,
  page = PAGE,
  limit = LIMIT,
  offset,
  type = operationType.Find,
}: offsetArgs<T>) {
  let totalPages: number = 0;
  let data: T[] = [];
  let countTotal: number = 0;
  let currentPage: number = 0;

  const SKIP = offset ? offset : (page - 1) * limit;

  if (type === operationType.Find) {
    const count = await repo.count(query);
    const docs = await repo.find({
      where: { ...query },
      skip: SKIP,
      take: limit,
    });
    totalPages = count ? Math.ceil(count / limit) : 0;
    data = docs;
    countTotal = count;
    currentPage = page;
  } else {
    const aggreation = repo.aggregate<T>(pipeline);
    const count = (await aggreation.toArray()).length;
    const docs = aggreation.skip(SKIP).limit(limit);
    totalPages = count ? Math.ceil(count / limit) : 0;
    data = await docs.toArray();
    countTotal = count;
    currentPage = page;
  }
  return {
    totalPages,
    data,
    countTotal,
    currentPage,
  };
}
