import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from '../interfaces/error-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Внутренняя ошибка сервера';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errorMessage = exceptionResponse;
      } else if (exceptionResponse['result']?.error) {
        errorMessage = exceptionResponse['result'].error;
      } else if (exceptionResponse['message']) {
        errorMessage = Array.isArray(exceptionResponse['message'])
          ? exceptionResponse['message'][0]
          : exceptionResponse['message'];
      }
    }

    const errorResponse: ErrorResponse = {
      success: false,
      result: {
        error: errorMessage,
      },
    };

    response.status(status).json(errorResponse);
  }
}
