export interface AuthRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
}
