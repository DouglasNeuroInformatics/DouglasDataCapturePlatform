export interface AuthLoginRequestDto {
  username: string;
  password: string;
}

export interface AuthLoginResponseDto {
  accessToken: string;
}
