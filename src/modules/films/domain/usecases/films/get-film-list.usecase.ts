import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../../repositories/films.repository';
import { FilmModel } from '../../models/fiml.model';

@Injectable()
export class GetFilmsListUsecase {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  public async execute(): Promise<FilmModel[] | undefined> {
    return this.filmsRepository.list();
  }
}
