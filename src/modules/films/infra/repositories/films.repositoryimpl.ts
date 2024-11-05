import { Injectable } from '@nestjs/common';
import { MpaaRating } from '../../domain/enums/mppa-rating.enum';
import { FilmModel } from '../../domain/models/fiml.model';
import { FilmsRepository } from '../../domain/repositories/films.repository';
import { FilmDatasource } from '../datasource/films.datasource';

@Injectable()
export class FilmsRepositoryImpl implements FilmsRepository {
  constructor(private readonly filmsDatasource: FilmDatasource) {}
  public get(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ): Promise<FilmModel | undefined> {
    return this.filmsDatasource.get(filmId, title, relations);
  }
  public list(): Promise<FilmModel[] | undefined> {
    return this.filmsDatasource.list();
  }
  public update(
    film: FilmModel,
    title: string | undefined,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number | undefined,
    originalLanguageId: number | undefined,
    rentalDuration: number,
    rentalRate: number | undefined,
    length: number | undefined,
    replacementCost: number | undefined,
    rating: MpaaRating | undefined,
    specialFeatures: string[] | undefined,
    fullText: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    return this.filmsDatasource.update(
      film,
      title,
      description,
      releaseYear,
      languageId,
      originalLanguageId,
      rentalDuration,
      rentalRate,
      length,
      replacementCost,
      rating,
      specialFeatures,
      fullText,
      lastUpdate,
    );
  }
}
