import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '@app/exceptions/userNotFound.exception';
import { UtilsProvider } from '@app/providers/utils.provider';
import type { UserDto } from '@app/modules/user/dto/user.dto';
import type { UserEntity } from '@app/modules/user/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { TokenPayloadDto } from './dto/TokenPayload.dto';
import type { UserLoginDto } from './dto/UserLogin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly userService: UserService,
  ) {}

  async createTokens(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync(
        { id: user.id },
        { expiresIn: this.configService.get('auth.accessExpires') },
      ),
      refreshToken: await this.jwtService.signAsync(
        { id: user.id },
        { expiresIn: this.configService.get('auth.refreshExpires') },
      ),
      type: 'Bearer',
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await UtilsProvider.validateHash(
      userLoginDto.password,
      user?.password,
    );
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
