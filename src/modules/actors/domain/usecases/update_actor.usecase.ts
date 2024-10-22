import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor.repository';
import { ActorModel } from '../models/actor.model';

@Injectable()
export class UpdateActorUseCase {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute(
    actor: ActorModel,
    firstName: string | undefined,
    lastName: string | undefined,
  ): Promise<ActorModel> {
    actor.firstName = firstName ? firstName : actor.firstName;
    actor.lastName = lastName ? lastName : actor.lastName;
    actor.lastUpdate = new Date();
    return await this.actorRepository.update(actor);
  }
}
