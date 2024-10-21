import { ActorModel } from "../models/actor.model";

export abstract class ActorRepository {
  abstract maxId(): Promise<number>;
  abstract findById(id: number): Promise<ActorModel>;
  abstract insert(actor: ActorModel): Promise<ActorModel>;
}