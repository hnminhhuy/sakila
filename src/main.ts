import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalException } from './exceptions/global_expection';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalException());
  app.useGlobalInterceptors(new LoggingInterceptor(),new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
