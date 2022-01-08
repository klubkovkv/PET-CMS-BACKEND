import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { UserService } from '@app/modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwtRefreshToken',
) {
  constructor(
    public readonly configService: ConfigService,
    public readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.['auth._refresh_token'],
      ]),
      secretOrKey: configService.get('auth.secret'),
      passReqToCallback: true,
    });
  }
  async validate(request: Request, { id: userId }) {
    const refreshToken = request?.cookies?.['auth._refresh_token'];
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, userId);
  }
}
