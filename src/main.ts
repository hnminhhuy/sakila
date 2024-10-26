import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalException } from './exceptions/global_expection';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config global useage of filter and interceptor
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.useGlobalFilters(new GlobalException());
  app.useGlobalInterceptors(new LoggingInterceptor(),new ResponseInterceptor());

  // Config swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sakila server API document')
    .setDescription('Sakila is service to manage film and retail service')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger-ui', app, document);

  await app.listen(process.env.PORT ?? 3000); 
}
bootstrap();
