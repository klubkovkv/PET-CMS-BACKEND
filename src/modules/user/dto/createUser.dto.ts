import { AbstractDto } from '@app/common/dto/abstract.dto';

export class CreateUserDto extends AbstractDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
