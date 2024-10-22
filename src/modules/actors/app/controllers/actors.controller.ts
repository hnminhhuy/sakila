import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateActorUseCase } from '../../domain/usecases/create_actor.usecase';
import { ErrorException } from 'src/exceptions/error_exception';
import { ErrorCode } from 'src/exceptions/error_codes';
import { CreateActorDto, UpdateActorDto } from '../dtos/actor.dto';
import { UpdateActorUseCase } from '../../domain/usecases/update_actor.usecase';
import { FindActorByIdUseCase } from '../../domain/usecases/find_actor_by_id.usecase';
import { FindAllActorUseCase } from '../../domain/usecases/find_all_actor.usecase';

@Controller('api/v1/actors')
export class ActorsController {
  constructor(
    private readonly createActorUseCase: CreateActorUseCase,
    private readonly updateActorUseCase: UpdateActorUseCase,
    private readonly findActorByIdUseCase: FindActorByIdUseCase,
    private readonly findAllActors: FindAllActorUseCase,
  ) {}

  @Get()
  async findAll() {
    try {
      const res = await this.findAllActors.execute();
      return {
        message: 'Retrieved data successfully',
        data: res,
      };
    } catch (error) {
      throw new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        error.message,
        error.description,
      );
    }
  }

  @Post()
  async create(@Body() actorDto: CreateActorDto) {
    try {
      const actor = await this.createActorUseCase.execute(
        actorDto.firstName,
        actorDto.lastName,
      );
      console.log(actor);
      return {
        message: 'Create actor sucessfully',
        data: actor,
      };
    } catch (error) {
      throw new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        error.message,
        undefined,
      );
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const res = await this.findActorByIdUseCase.execute(id);
    if (!res) {
      throw new ErrorException(
        ErrorCode.RESOURCE_NOT_FOUND,
        `Cannot find actor with ${id} id`,
        undefined,
      );
    }
    return {
      message: 'Retrived actor successfully',
      data: res,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    try {
      const actor = await this.findActorByIdUseCase.execute(id);
      if (!actor) {
        throw new ErrorException(
          ErrorCode.RESOURCE_NOT_FOUND,
          `Cannot find actor with ${id} id`,
          undefined,
        );
      }
      const res = await this.updateActorUseCase.execute(
        actor,
        updateActorDto.firstName,
        updateActorDto.lastName,
      );
      return {
        message: 'Update actor sucessfully.',
        data: res,
      };
    } catch (error) {
      throw new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        error.message,
        undefined,
      );
    }
  }
}
