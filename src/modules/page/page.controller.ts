import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PageService } from '@app/modules/page/page.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@app/decorators/authUser.decorator';
import { UserEntity } from '@app/modules/user/user.entity';
import { CreatePageDto } from '@app/modules/page/dto/createPage.dto';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @AuthUser() currentUser: UserEntity,
    @Body('page') createPageDto: CreatePageDto,
  ): Promise<any> {
    return this.pageService.createPage(currentUser, createPageDto);
  }
}
