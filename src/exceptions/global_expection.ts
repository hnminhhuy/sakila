import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorException } from './error_exception';
import { ErrorCode } from './error_codes';
import { Response } from 'express';

@Catch()
export class GlobalException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let errorException: ErrorException;
    let httpStatusCode: number;

    if (exception.status === 404) {
      httpStatusCode = 404;
      errorException = new ErrorException(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Resource not found',
        'The requested resource could not be found.',
      );
    } else if (exception instanceof ErrorException) {
      errorException = exception;
      httpStatusCode = exception.httpStatusCode;
    } else {
      errorException = new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        exception.response?.error ??
          exception.response?.message ??
          exception.message ??
          'Undefined Error',
        exception.message,
      );
      httpStatusCode = exception.status ?? errorException.httpStatusCode;
    }

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
      .status(httpStatusCode)
      .json(errorException.getErrors());
  }
}
