import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor.repository';
import { ActorModel } from '../models/actor.model';

@Injectable()
export class FindAllActorUseCase {
  constructor(private readonly actorRepository: ActorRepository) {}
  async execute(): Promise<Array<ActorModel>> {
    return this.actorRepository.findAll();
  }
}
