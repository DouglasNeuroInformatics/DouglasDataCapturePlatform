import { AuthRequestDto, AuthResponseDto } from '@dnp/common/dto';
import { authResponseSchema } from '@dnp/common/schemas';

import { ApiRequest, ApiRequestError, BaseApi } from './api.base.js';

export default class AuthApi extends BaseApi {
  static requestToken: ApiRequest<AuthRequestDto, AuthResponseDto> = async ({ username, password }) => {
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
        throw new ApiRequestError(`${response.status}: ${response.statusText}`);
      }
      return authResponseSchema.validateAsync(await response.json());
    } catch (error) {
      if (error instanceof ApiRequestError) {
        throw error;
      }
      throw ApiRequestError.createFrom(error);
    }
  };
}
