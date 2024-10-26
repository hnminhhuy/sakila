import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateActorUseCase } from '../../domain/usecases/create_actor.usecase';
import { ErrorException } from 'src/exceptions/error_exception';
import { ErrorCode } from 'src/exceptions/error_codes';
import { ActorDto, ActorResponseDto, ActorsResponseDto, CreateActorDto, GetActorParamDto, UpdateActorDto } from '../dtos/actor.dto';
import { UpdateActorUseCase } from '../../domain/usecases/update_actor.usecase';
import { FindActorByIdUseCase } from '../../domain/usecases/find_actor_by_id.usecase';
import { FindAllActorUseCase } from '../../domain/usecases/find_all_actor.usecase';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseErrorResponse } from 'src/interceptors/base_response';

@ApiTags('actors')
@Controller('api/v1/actors')
export class ActorsController {
  constructor(
    private readonly createActorUseCase: CreateActorUseCase,
    private readonly updateActorUseCase: UpdateActorUseCase,
    private readonly findActorByIdUseCase: FindActorByIdUseCase,
    private readonly findAllActors: FindAllActorUseCase,
  ) {}

  @ApiOperation({description: 'Retrieve all actors information'})
  @ApiResponse({status: 200, type: ActorsResponseDto})
  @ApiResponse({status: 500, description: 'Internal error', type: BaseErrorResponse})
  @ApiResponse({status: 404, description: 'Resource not found', type: BaseErrorResponse})
  @Get('all')
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


  @ApiOperation({description: "Create a new actor"})
  @ApiBody({ type: CreateActorDto, description: "Details for a new actor"})
  @ApiResponse({status: 200, type: ActorResponseDto})
  @ApiResponse({status: 400, description: 'Bab request', type: BaseErrorResponse})
  @ApiResponse({status: 500, description: 'Internal error', type: BaseErrorResponse})
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

  @ApiOperation({description: "Get a actor by its id"})
  @ApiParam({name: 'id', description: 'Unique id of the actor'})
  @ApiResponse({status: 200, description: 'Get actor successfull', type: ActorResponseDto})
  @ApiResponse({status: 400, description: 'Bab request', type: BaseErrorResponse})
  @ApiResponse({status: 500, description: 'Internal error', type: BaseErrorResponse})
  @ApiResponse({status: 404, description: 'Resource not found', type: BaseErrorResponse})
  @Get(':id')
  async findOneById(@Param() params: GetActorParamDto) {
    const res = await this.findActorByIdUseCase.execute(params.actor_id);
    if (!res) {
      throw new ErrorException(
        ErrorCode.RESOURCE_NOT_FOUND,
        `Cannot find actor with ${params.actor_id} id`,
        undefined,
      );
    }
    return {
      message: 'Retrived actor successfully',
      data: res,
    };
  }

  @ApiOperation({description: "Update actor by using its id and new information"})
  @ApiParam({name: 'id', type: 'number', description: 'Unique ID of actor which is needed to update'})
  @ApiBody({type: UpdateActorDto, description: "New data for updated actor"})
  @ApiResponse({status: 200, type: ActorResponseDto})
  @ApiResponse({status: 400, description: 'Bab request', type: BaseErrorResponse})
  @ApiResponse({status: 500, description: 'Internal error', type: BaseErrorResponse})
  @ApiResponse({status: 404, description: 'Resource not found', type: BaseErrorResponse})
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
