import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetFilmsListUsecase } from './domain/usecases/films/get-film-list.usecase';
import { FilmDatasource } from './infra/datasource/films.datasource';
import { FilmsRepository } from './domain/repositories/films.repository';
import { FilmsRepositoryImpl } from './infra/repositories/films.repositoryimpl';
import { FilmEntity } from './infra/datasource/entities/film.entity';
import { FilmController } from './app/controllers/films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  exports: [],
  providers: [
    {
      provide: FilmsRepository,
      useClass: FilmsRepositoryImpl,
    },
    // Use-cases
    GetFilmsListUsecase,
    FilmDatasource,
  ],
  controllers: [FilmController],
})
export class FilmsModule {}
