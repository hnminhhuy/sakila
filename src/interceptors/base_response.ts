import { ApiProperty } from "@nestjs/swagger";

export class BaseResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export class BaseErrorResponse {
  @ApiProperty()
  errorCode: number;

  @ApiProperty()
  errorMessage: string;

  @ApiProperty()
  errorDescription: string | undefined;
}