import { AuthTokenPayload, authTokenPayloadSchema } from '@dnp/common';
import jwtDecode from 'jwt-decode';

export default class AuthToken {
  payload: AuthTokenPayload | null;
  constructor(token: string) {
    const { value, error } = authTokenPayloadSchema.validate(jwtDecode(token), {
      allowUnknown: true
    });
    if (error) {
      console.error(error);
    }
    this.payload = value ?? null;
  }
}
