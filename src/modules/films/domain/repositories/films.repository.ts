import { Injectable } from '@nestjs/common';
import { MpaaRating } from '../enums/mppa-rating.enum';
import { FilmModel } from '../models/fiml.model';

@Injectable()
export abstract class FilmsRepository {
  public abstract get(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ): Promise<FilmModel | undefined>;

  public abstract list(): Promise<FilmModel[] | undefined>;

  public abstract update(
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
  ): Promise<boolean>;
}
