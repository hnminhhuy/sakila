import { ErrorCode } from './error_codes';

export class ErrorException extends Error {
  public readonly code: number;
  public readonly httpStatusCode: number;
  public readonly description: any;

  constructor(code: ErrorCode, message: string | undefined, description: any) {
    super(message);
    const [errorCode, httpStatusCode] = code.split('|');
    this.code = Number(errorCode);
    this.httpStatusCode = Number(httpStatusCode);
    this.description = description;
  }

  public getErrors(): Record<string, any> {
    return {
      errorCode: this.code,
      errorMessage: this.message,
      ...(this.description && { errorDescription: this.description }),
    };
  }
}
