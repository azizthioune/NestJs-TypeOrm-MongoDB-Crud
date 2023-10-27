import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function ormConfig(): TypeOrmModuleOptions {
  return {
    url: process.env.mongoUri,
    type: 'mongodb',
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: ['dist/**/schema/*.schema.js'],
    migrations: ['dist/database/migrations/*.js'],
    subscribers: ['dist/observers/subscribers/*.subscriber.js'],
    cli: {
      entitiesDir: 'src/components/**/schema',
      migrationsDir: 'src/database/migrations',
      subscribersDir: 'src/observers/subscribers',
    },
  };
}
