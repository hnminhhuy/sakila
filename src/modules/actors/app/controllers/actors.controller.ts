import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CreateActorUseCase } from "../../domain/usecases/create_actor.usecase";
import { ActorDto } from "../dtos/actor.dto";
import { Response } from "express";
import { ErrorException } from "src/exceptions/error_exception";
import { ErrorCode } from "src/exceptions/error_codes";

@Controller('api/v1/actors')
export class ActorsController {
  constructor(
    private readonly createActorUseCase: CreateActorUseCase
  ) {}

  @Post() 
  async create(@Body() actorDto: ActorDto, @Res() res: Response) {
    const actor = await this.createActorUseCase.execute(actorDto.firstName, actorDto.lastName);

    if (!actor) {
      throw new ErrorException(
        ErrorCode.DATABASE_ERROR,
        "Error",
        undefined
      )
    }

    res.status(HttpStatus.CREATED).json({
      message: 'Create actor successfully',
      data: actor.toJson()
    })
  }
}