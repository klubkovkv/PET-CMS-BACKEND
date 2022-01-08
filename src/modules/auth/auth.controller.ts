import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserEntity } from '@app/modules/user/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { AuthService } from './auth.service';
import { UserPayloadDto } from './dto/userPayload.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@app/decorators/authUser.decorator';
import { UpdateUserDto } from '@app/modules/user/dto/updateUser.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    public readonly userService: UserService,
    public readonly authService: AuthService,
    public readonly configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    const tokens = await this.authService.createTokens(userEntity);

    response.cookie('auth._refresh_token', tokens.refreshToken, {
      path: 'api/auth',
      maxAge:
        parseInt(this.configService.get('auth.refreshExpires')) *
        24 *
        60 *
        60 *
        1000,
      httpOnly: true,
    });

    await this.userService.setCurrentRefreshToken(
      tokens.refreshToken,
      userEntity.id,
    );

    return new UserPayloadDto(userEntity, tokens);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async getCurrentUser(
    @AuthUser()
    user: UserEntity,
  ): Promise<UserPayloadDto> {
    const tokens = await this.authService.createTokens(user);
    return new UserPayloadDto(user, tokens);
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async updateCurrentUser(
    @AuthUser('id')
    currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserPayloadDto> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    const tokens = await this.authService.createTokens(user);
    return new UserPayloadDto(user, tokens);
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwtRefreshToken'))
  @UseInterceptors(ClassSerializerInterceptor)
  async refresh(
    @AuthUser()
    userEntity: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.createTokens(userEntity);

    response.cookie('auth._refresh_token', tokens.refreshToken, {
      path: 'api/auth',
      maxAge:
        parseInt(this.configService.get('auth.refreshExpires')) *
        24 *
        60 *
        60 *
        1000,
      httpOnly: true,
    });

    await this.userService.setCurrentRefreshToken(
      tokens.refreshToken,
      userEntity.id,
    );

    return new UserPayloadDto(userEntity, tokens);
  }
}
