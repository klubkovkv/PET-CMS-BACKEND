import { Controller, Post } from '@nestjs/common';
import { PageService } from '@app/modules/page/page.service';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Post()
  async create() {
    return this.pageService.createPage();
  }
}
