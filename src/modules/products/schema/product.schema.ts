import { Field, ObjectType } from '@nestjs/graphql';
import { BaseSchema } from 'src/common/schemas';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export default class Product extends BaseSchema {
  @Field({ description: 'Product uid!', nullable: true })
  @Column()
  uid: string;

  @Field({ description: 'Name of the product', nullable: true })
  @Column()
  name: string;

  @Field({ description: 'Currency of the product', nullable: true })
  @Column()
  currency: string;

  @Field({ description: 'Price of the product', nullable: true })
  @Column()
  price: number;

  @Field({ description: 'Image of the product', nullable: true })
  @Column()
  image: string;
}
