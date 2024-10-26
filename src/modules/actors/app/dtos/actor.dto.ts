import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'src/interceptors/base_response';

export class ActorDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  actorId!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  lastUpdate: Date;
}

export class GetActorParamDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
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

export class ActorResponseDto extends BaseResponse {
  @ApiProperty()
  data: ActorDto;
}

export class ActorsResponseDto extends BaseResponse {
  @ApiProperty({type: [ActorDto]})
  data: ActorDto[];
}