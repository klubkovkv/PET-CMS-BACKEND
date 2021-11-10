import { UserDto } from '@app/modules/user/dto/user.dto';
import { TokenPayloadDto } from './TokenPayload.dto';

export class UserPayloadDto {
  user: UserDto;
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
