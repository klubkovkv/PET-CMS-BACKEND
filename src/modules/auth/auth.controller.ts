import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '@app/modules/user/dto/user.dto';
import { UserEntity } from '@app/modules/user/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { AuthService } from './auth.service';
import { UserPayloadDto } from './dto/userPayload.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@app/decorators/authUser.decorator';
import { UpdateUserDto } from '@app/modules/user/dto/updateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    public readonly userService: UserService,
    public readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async userLogin(
    @Body('user') userLoginDto: UserLoginDto,
  ): Promise<UserPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createToken(userEntity);
    return new UserPayloadDto(userEntity, token);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async getCurrentUser(
    @AuthUser()
    user: UserEntity,
  ): Promise<UserPayloadDto> {
    const token = await this.authService.createToken(user);
    return new UserPayloadDto(user, token);
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
    const token = await this.authService.createToken(user);
    return new UserPayloadDto(user, token);
  }
}
