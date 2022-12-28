import jwtDecode from 'jwt-decode';

export default class AuthToken {
  constructor(public raw: string) {}

  decode() {
    return jwtDecode(this.raw);
  }
}
