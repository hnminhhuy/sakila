import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActorRepository } from "./domain/repositories/actor.repository";
import { ActorRepositoryImpl } from "./infra/repositories/actor.repository_impl";
import { CreateActorUseCase } from "./domain/usecases/create_actor.usecase";
import { ActorsController } from "./app/controllers/actors.controller";
import { ActorDatasource } from "./infra/datasource/actor.datasource";
import { ActorEntity } from "./infra/datasource/entities/actor.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([ActorEntity])
  ],
  exports: [],
  providers: [
    {provide: ActorRepository, useClass: ActorRepositoryImpl},
    CreateActorUseCase,
    ActorDatasource
  ],
  controllers: [ActorsController]
})
export class ActorsModule {}