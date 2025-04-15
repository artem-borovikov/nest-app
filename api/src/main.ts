import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';
import { ValidationFilter } from './infrastructure/filters/validation.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(errors);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationFilter());
  app.setGlobalPrefix('api/v/1');
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
