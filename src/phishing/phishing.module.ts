import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from '@src/phishing/schemas/phishing-attempt.schema';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PhishingAttempt.name,
        schema: PhishingAttemptSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
