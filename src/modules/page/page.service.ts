import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/modules/user/user.entity';
import { CreatePageDto } from '@app/modules/page/dto/createPage.dto';
import { PageEntity } from '@app/modules/page/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  async createPage(
    currentUser: UserEntity,
    createPageDto: CreatePageDto,
  ): Promise<PageEntity> {
    const page = new PageEntity();
    Object.assign(page, createPageDto);

    page.author = currentUser;

    return this.pageRepository.save(page);
  }
}
