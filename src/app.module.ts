import appConfig from '@config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { BetterLoggerModule } from 'nest-elastic-logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    BetterLoggerModule.forRoot({
      serviceName: process.env.npm_package_name!,
      serviceVersion: process.env.npm_package_version,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
