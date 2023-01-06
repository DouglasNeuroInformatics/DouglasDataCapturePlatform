export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  username: string;
  role: string;
  refreshToken?: string;
}
