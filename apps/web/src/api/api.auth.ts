import { AuthRequestDto, AuthResponseDto } from '@dnp/common/dto';
import { authResponseSchema } from '@dnp/common/schemas';

import { type AuthToken } from '../store/AuthContext.js';

import BaseAPI from './api.base.js';

export default class AuthAPI extends BaseAPI {
  static async requestToken({ username, password }: AuthRequestDto): Promise<AuthToken | null> {
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
      console.error(response);
      return null;
    }
    let result: AuthResponseDto;
    try {
      result = await authResponseSchema.validateAsync(await response.json());
    } catch (error) {
      console.error(error);
      return null;
    }
    return result.accessToken;
  }
}
