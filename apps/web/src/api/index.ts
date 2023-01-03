import {
  AuthRequestDto,
  AuthResponseDto,
  InstrumentGetResponseDto,
  SubjectGetResponseDto,
  SubjectPostRequestDto,
  SubjectPostResponseDto,
  authResponseSchema,
  instrumentGetResponseSchema,
  subjectGetResponseSchema,
  subjectPostResponseSchema
} from '@dnp/common';
import Joi from 'joi';

type GetRequest<T> = (...args: any[]) => Promise<T>;

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
        allowUnknown: true
      });
  };

  static getInstruments: GetRequest<InstrumentGetResponseDto[]> = async () => {
    const response = await fetch(`${this.host}/api/instruments`);
    return Joi.array<InstrumentGetResponseDto[]>()
      .items(instrumentGetResponseSchema)
      .validateAsync(await response.json(), {
        allowUnknown: true
      });
  };

  static getInstrumentById: GetRequest<InstrumentGetResponseDto> = async (id: string) => {
    const response = await fetch(`${this.host}/api/instruments/${id}`);
    if (!response.ok) {
      throw response;
    }
    return instrumentGetResponseSchema.validateAsync(await response.json(), {
      allowUnknown: true // Until the server-side schemas are set
    });
  };
}
