import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalException } from './exceptions/global_expection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalException());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
