import { Module } from '@nestjs/common';
import { PageController } from '@app/modules/page/page.controller';
import { PageService } from '@app/modules/page/page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from '@app/modules/page/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
