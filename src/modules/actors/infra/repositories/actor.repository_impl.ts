import { Inject, Injectable } from "@nestjs/common";
import { ActorModel } from "../../domain/models/actor.model";
import { ActorRepository } from "../../domain/repositories/actor.repository";
import { ActorDatasource } from "../datasource/actor.datasource";

@Injectable()
export class ActorRepositoryImpl implements ActorRepository {
  constructor(private readonly actorDatasource: ActorDatasource) {}
  
  async findAll(): Promise<Array<ActorModel>> {
    return this.actorDatasource.findAll();
  }

  async update(actor: ActorModel): Promise<ActorModel> {
    return this.actorDatasource.update(actor);
  }

  async maxId(): Promise<number> {
    return await this.actorDatasource.maxId() || 0;
  }
  async findById(id: number): Promise<ActorModel> {
    return await this.actorDatasource.findById(id);
  }
  async insert(actor: ActorModel): Promise<ActorModel> {
    return await this.actorDatasource.insert(actor);
  }

}