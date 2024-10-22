import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor.repository';
import { ActorModel } from '../models/actor.model';

@Injectable()
export class FindActorByIdUseCase {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute(id: number): Promise<ActorModel> {
    return await this.actorRepository.findById(id);
  }
}
