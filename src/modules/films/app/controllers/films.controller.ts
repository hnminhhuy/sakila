import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetFilmsListUsecase } from '../../domain/usecases/films/get-film-list.usecase';
import { FilmModel } from '../../domain/models/fiml.model';
import { ErrorException } from 'src/exceptions/error_exception';
import { ErrorCode } from 'src/exceptions/error_codes';

@ApiTags('Film')
@Controller({ path: 'api/v1/films' })
export class FilmController {
  constructor(private readonly getFilmListUsecase: GetFilmsListUsecase) {}

  @ApiOperation({ summary: 'Get a list of all films' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film list found',
    type: [FilmModel],
  })
  @Get('/')
  async getList() {
    const films = await this.getFilmListUsecase.execute();

    if (!films) {
      throw new ErrorException(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Films list not found',
        undefined,
      );
    }

    return {
      message: 'Retrieve list films successfully',
      data: films,
    };
  }
}
