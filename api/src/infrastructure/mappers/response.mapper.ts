import { Injectable } from '@nestjs/common';
import { IResponseMapper } from '../interfaces/responseMapper.interface';
import { ApiResponse } from '../interfaces/serviceResponse.interface';

@Injectable()
export class ResponseMapper implements IResponseMapper {
  public success<T>(data?: T): ApiResponse<T> {
    return {
      success: true,
      result: data,
    };
  }

  public error(): ApiResponse<null> {
    return {
      success: false,
    };
  }

  public notFound(): ApiResponse<null> {
    return {
      success: false,
    };
  }
}
