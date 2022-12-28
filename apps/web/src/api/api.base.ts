import { ValidationError } from 'joi';

export class ApiRequestError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ApiRequestError';
  }

  static createFrom(error: unknown): ApiRequestError {
    switch (error) {
      case error instanceof ValidationError:
        return new this('Schema validation failed!', {
          cause: error
        });
      default:
        return new this('An unknown error occured!', {
          cause: error
        });
    }
  }
}

export type ApiRequest<RequestDto, ResponseDto> = (requestDto: RequestDto) => Promise<ResponseDto>;

export abstract class BaseApi {
  protected static host = import.meta.env.VITE_API_HOST;
}
