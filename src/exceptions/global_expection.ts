import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorException } from './error_exception';
import { ErrorCode } from './error_codes';
import { Response } from 'express';

@Catch()
export class GlobalException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let errorException: ErrorException;
    let errorCode: ErrorCode;

    console.log(exception);
    switch (exception.status) {
      case 404:
        errorCode = ErrorCode.RESOURCE_NOT_FOUND
        break;
      case 400:
        errorCode = ErrorCode.VALIDATION_ERROR
        break;
      case 403:
        errorCode = ErrorCode.FORBIDDEN_ERROR
        break;
      default:
        errorCode = ErrorCode.UNDEFINED_ERROR
        break;
    }


    errorException = new ErrorException(
      errorCode,
      exception.response?.error ?? 'Undefined Error',
      exception.response.message
    )


    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    try {
      response.setHeader('X-Error-Message', errorException.message);
    } catch (headerError) {
      response.setHeader(
        'X-Error-Message',
        'Error setting error message header',
      );
    }

    return response
      .setHeader('X-Error-Code', errorException.code)
      .status(exception.status)
      .json(errorException.getErrors());
  }
}
