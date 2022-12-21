import { AuthLoginRequestDto, AuthLoginResponseDto } from '@dnp/common/dto';
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator.js';
import { validate } from 'class-validator';

import BaseAPI from './base-api.js';

export class AuthAPI extends BaseAPI {
  static async login({ username, password }: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    const response = await fetch(`${this.host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    this.checkResponse(response);
    if (!response.ok) {
      console.error(response.status, response.statusText);
    }

    const resolver = classValidatorResolver(AuthLoginResponseDto);
    const data = await response.json() as unknown;
    const dto = Object.assign(new AuthLoginResponseDto(), data);
    const errors = await validate(dto);
    console.error(errors)
    return dto;
  }
}
