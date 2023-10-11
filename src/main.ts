import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as chalk from 'chalk';

const PORT = 4000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    await app.listen(PORT);
    console.log(
      `Yess! 😀 Server is listening on ${chalk
        .hex('#87e8de')
        .bold(`http://localhost:${PORT!}`)}/graphql`,
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
