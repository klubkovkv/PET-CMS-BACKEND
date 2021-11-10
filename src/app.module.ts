import { Module } from '@nestjs/common';
import databaseConfig from '@app/config/database.config';
import authConfig from './config/auth.config';
import appConfig from '@app/config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@app/database/typeorm-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from '@app/modules/user/user.module';
import { TagModule } from '@app/modules/tag/tag.module';
import { PageModule } from '@app/modules/page/page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
    TagModule,
    PageModule,
  ],
})
export class AppModule {}
