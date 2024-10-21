import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ActorEntity } from "./entities/actor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorModel } from "../../domain/models/actor.model";

@Injectable()
export class ActorDatasource {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly datasourceRepo : Repository<ActorEntity>
  ) {}

  async maxId(): Promise<number> {
    return await this.datasourceRepo.maximum("actor_id");
  }

  async findById(id: number): Promise<ActorModel> {
    const res = await this.datasourceRepo.findOne({where: {actor_id: id}});
    return res?.toModel();
  }
  async insert(actor: ActorModel): Promise<ActorModel> {
    const entity = new ActorEntity();
    entity.actor_id = actor.id;
    entity.first_name = actor.firstName;
    entity.last_name = actor.lastName;
    entity.last_update = actor.lastUpdate;
    const res = await this.datasourceRepo.insert(entity);
    return actor;
  }
}