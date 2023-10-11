import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as chalk from 'chalk';

//use DEV_PORT on local
const DEV_PORT = 4000;
const PROD_PORT = 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    await app.listen(PROD_PORT);
    console.log(
      `Yess! 😀 Server is listening on ${chalk
        .hex('#87e8de')
        .bold(`http://localhost:${PROD_PORT!}`)}/graphql`,
    );
  } catch (error) {
    console.error(
      `❌  Error starting server, ${error}`,
      '',
      'Bootstrap',
      false,
    );
    process.exit();
  }
}
bootstrap().catch((e) => {
  throw e;
});
