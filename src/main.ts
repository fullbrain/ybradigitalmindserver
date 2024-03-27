import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(),
    // {whitelist: true}
  );
  app.setGlobalPrefix('api/v1');
  // app.enableCors();
  await app.listen(5000);
}
bootstrap();
