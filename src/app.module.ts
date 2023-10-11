import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheService } from './config/cache';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormConfig';
import { ProductsModule } from './modules/products/product.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      //path: `/graphql`, remove comment on development
      debug: false,
      playground: true,
      context: ({ request }) => ({ request }),
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log(`🗳  The module App has been initialized.`);
  }
}
