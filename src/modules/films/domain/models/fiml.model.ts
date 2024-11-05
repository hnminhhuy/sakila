import { MpaaRating } from '../enums/mppa-rating.enum';

export class FilmModel {
  public readonly filmId: number;
  public readonly title: string;

  public readonly description: string | undefined;

  public readonly releaseYear: number | undefined;

  public readonly languageId: number;

  public readonly originalLanguageId: number | undefined;

  public readonly rentalDuration: number;

  public readonly rentalRate: number;

  public readonly length: number | undefined;

  public readonly replacementCost: number;

  public readonly rating: MpaaRating | undefined;

  public readonly lastUpdate: Date;

  public readonly specialFeatures: string[] | undefined;

  public readonly fulltext: string | undefined;

  constructor(
    filmId: number,
    title: string,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number,
    originalLanguageId: number | undefined,
    rentalDuration: number,
    rentalRate: number,
    length: number | undefined,
    replacementCost: number,
    rating: MpaaRating | undefined,
    lastUpdate: Date,
    specialFeatures: string[] | undefined,
    fulltext: string | undefined,
  ) {
    this.filmId = filmId;
    this.title = title;
    this.description = description;
    this.releaseYear = releaseYear;
    this.languageId = languageId;
    this.originalLanguageId = originalLanguageId;
    this.rentalDuration = rentalDuration;
    this.rentalRate = rentalRate;
    this.length = length;
    this.replacementCost = replacementCost;
    this.rating = rating;
    this.lastUpdate = lastUpdate;
    this.specialFeatures = specialFeatures;
    this.fulltext = fulltext;
  }
}
