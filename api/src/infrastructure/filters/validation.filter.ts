import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      status === HttpStatus.BAD_REQUEST &&
      Array.isArray(exceptionResponse['message'])
    ) {
      response.status(status).json({
        success: false,
        result: {
          error: 'Ошибка валидации запроса!',
        },
      });
    } else {
      response.status(status).json({
        success: false,
        error: exception.message,
      });
    }
  }
}
