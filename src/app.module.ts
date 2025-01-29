import { AuthModule } from '@auth/auth.module';
import appConfig from '@config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { PhishingModule } from './phishing/phishing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1/phishing-simulation'),
    AuthModule,
    UsersModule,
    PhishingModule,
  ],
})
export class AppModule {}
