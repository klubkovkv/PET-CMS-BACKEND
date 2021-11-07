import { AbstractDto } from '@app/common/dto/abstract.dto';

export class UserDto extends AbstractDto {
  readonly email: string;
  readonly password: string;
}
