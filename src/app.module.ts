import { Module } from '@nestjs/common';
import databaseConfig from '@app/config/database.config';
import appConfig from '@app/config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@app/database/typeorm-config.service';
import { UserModule } from '@app/modules/user/user.module';
import { TagModule } from '@app/modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    // UserModule,
    TagModule,
  ],
})
export class AppModule {}
