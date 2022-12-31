import { AuthRequestDto, AuthResponseDto, SubjectDto, authResponseSchema, subjectDtoSchema } from '@dnp/common';
import Joi from 'joi';

type GetRequest<T> = () => Promise<T>;

type PostRequest<T, U> = (requestDto: T) => Promise<U>;

export class APIRequestError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ApiRequestError';
  }

  static createFrom(error: unknown): APIRequestError {
    switch (error) {
      case error instanceof Joi.ValidationError:
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
      throw response;
    }
    return authResponseSchema.validateAsync(await response.json());
  };

  static addSubject: PostRequest<SubjectDto, SubjectDto> = async (dto) => {
    const response = await fetch(`${this.host}/api/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });
    console.log(response);
  };

  static getSubjects: GetRequest<SubjectDto[]> = async () => {
    const response = await fetch(`${this.host}/api/subjects`);
    return Joi.array<SubjectDto[]>()
      .items(subjectDtoSchema)
      .validateAsync(await response.json(), {
        allowUnknown: true // TEMP
      }); // will throw if invalid
  };
}
