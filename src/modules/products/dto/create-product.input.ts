import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field({ description: 'Unique ID for the product', nullable: false })
  uid: string;

  @Field({ description: 'Description of the product', nullable: false })
  name: string;

  @Field({ description: 'Currency of the product', nullable: true })
  currency: string;

  @Field({ description: 'Price of the product', nullable: true })
  price: number;

  @Field({ description: 'Image of the product', nullable: true })
  image: string;
}
