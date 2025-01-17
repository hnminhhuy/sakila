import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ActorsModule } from './modules/actors/actors.module';
import { FilmsModule } from './modules/films/films.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<TypeOrmModuleAsyncOptions>('databaseConfig'),
    }),
    ActorsModule,
    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
