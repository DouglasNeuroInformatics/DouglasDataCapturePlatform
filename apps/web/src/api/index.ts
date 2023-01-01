import {
  AuthRequestDto,
  AuthResponseDto,
  SubjectGetResponseDto,
  SubjectPostRequestDto,
  SubjectPostResponseDto,
  authResponseSchema,
  subjectGetResponseSchema,
  subjectPostResponseSchema
} from '@dnp/common';
import Joi from 'joi';

type GetRequest<T> = () => Promise<T>;

type PostRequest<T, U> = (requestDto: T) => Promise<U>;

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

  static addSubject: PostRequest<SubjectPostRequestDto, SubjectPostResponseDto> = async (dto) => {
    const response = await fetch(`${this.host}/api/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    });
    if (!response.ok) {
      throw response;
    }
    return subjectPostResponseSchema.validateAsync(await response.json(), {
      allowUnknown: true // Until the server-side schemas are set
    });
  };

  static getSubjects: GetRequest<SubjectGetResponseDto[]> = async () => {
    const response = await fetch(`${this.host}/api/subjects`);
    return Joi.array<SubjectGetResponseDto[]>()
      .items(subjectGetResponseSchema)
      .validateAsync(await response.json(), {
        allowUnknown: true // TEMP
      }); // will throw if invalid
  };
}
