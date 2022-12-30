import { AuthRequestDto, AuthResponseDto, SubjectDto, authResponseSchema, subjectsArraySchema } from '@dnp/common';
import Joi, { ValidationError } from 'joi';

type GetRequest<T> = () => Promise<T>;

type PostRequest<T, U> = (requestDto: T) => Promise<U>;

export class APIRequestError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ApiRequestError';
  }

  static createFrom(error: unknown): APIRequestError {
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

export default class API {
  private static host = import.meta.env.VITE_API_HOST;

  static requestToken: PostRequest<AuthRequestDto, AuthResponseDto> = async ({ username, password }) => {
    try {
      const response = await fetch(`${this.host}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (!response.ok) {
        throw new APIRequestError(`${response.status}: ${response.statusText}`);
      }
      return authResponseSchema.validateAsync(await response.json());
    } catch (error) {
      if (error instanceof APIRequestError) {
        throw error;
      }
      throw APIRequestError.createFrom(error);
    }
  };

  static getSubjects: GetRequest<SubjectDto[]> = async () => {
    const response = await fetch(`${this.host}/api/subjects`);
    return subjectsArraySchema.validateAsync(await response.json(), {
      allowUnknown: true // TEMP
    }); // will throw if invalid
  };
}
