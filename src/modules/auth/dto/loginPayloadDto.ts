import { UserDto } from '@app/modules/user/dto/user.dto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  user: UserDto;
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
