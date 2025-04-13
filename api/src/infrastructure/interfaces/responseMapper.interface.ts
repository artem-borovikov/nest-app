import { ApiResponse } from './serviceResponse.interface';

export interface IResponseMapper {
  success<T>(data?: T): ApiResponse<T>;
  error(): ApiResponse<null>;
  notFound(): ApiResponse<null>;
}

export const IResponseMapper = Symbol('IResponseMapper');
