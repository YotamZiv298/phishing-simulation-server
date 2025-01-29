import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async sendEmail(@Body('email') email: string) {
    return this.phishingService.sendEmail(email);
  }

  @Get('clicked')
  async trackClick(@Query('email') email: string) {
    return this.phishingService.updateStatus(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('attempts')
  async getAttempts() {
    return this.phishingService.getAllAttempts();
  }
}
