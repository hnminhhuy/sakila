import { ActorModel } from '../models/actor.model';
import { ActorRepository } from '../repositories/actor.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateActorUseCase {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute(firstName: string, lastName: string): Promise<ActorModel> {
    const actor = new ActorModel(
      (await this.actorRepository.maxId()) + 1,
      firstName,
      lastName,
      new Date(),
    );

    return await this.actorRepository.insert(actor);
  }
}
