import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql';
import { BeforeUpdate, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
export abstract class BaseSchema {
  @Field(() => ID, { description: 'Identify element ', nullable: true })
  @ObjectIdColumn()
  _id: ObjectID;

  @Field({ description: 'Is deleted' })
  @Column()
  isDeleted: boolean;

  @Field({ description: 'Created at' })
  @Column()
  createdAt: string;

  @Field({ description: 'Updated at' })
  @Column()
  updatedAt: string;

  constructor(partial?: Partial<BaseSchema>) {
    if (partial) {
      Object.assign(this, partial);
    }
    this.isDeleted = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date().toISOString();
  }
}
