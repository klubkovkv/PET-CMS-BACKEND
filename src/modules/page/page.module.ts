import { Module } from '@nestjs/common';
import { PageController } from '@app/modules/page/page.controller';
import { PageService } from '@app/modules/page/page.service';

@Module({
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
