import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Trim } from '@app/decorators/transforms.decorator';

export class UserRegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
