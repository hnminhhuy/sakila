import { PickType } from "@nestjs/swagger";

export class ActorDto {
  actorId!: string;
  firstName: string;
  lastName: string;
}

export class GetActorParamDto {
  actor_id!: number;
}

export class UpdateActorDto extends PickType(ActorDto, [
  'firstName',
  'lastName',
]) {}

export class CreateActorDto extends PickType(ActorDto, [
  'firstName',
  'lastName',
]) {}