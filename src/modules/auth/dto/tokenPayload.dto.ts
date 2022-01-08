export class TokenPayloadDto {
  refreshToken: string;
  accessToken: string;
  type: string;

  constructor(data: TokenPayloadDto) {
    this.refreshToken = data.refreshToken;
    this.accessToken = data.accessToken;
    this.type = data.type;
  }
}
