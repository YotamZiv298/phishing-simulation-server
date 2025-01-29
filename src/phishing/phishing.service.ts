import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhishingAttempt } from '@src/phishing/schemas/phishing-attempt.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private readonly phishingModel: Model<PhishingAttempt>,
    private readonly httpService: HttpService,
  ) {}

  async sendEmail(email: string) {
    const trackingLink = `http://localhost:3000/phishing/clicked?email=${email}`;

    nodemailer.createTestAccount(async (err, account) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      const mailOptions = {
        from: 'example@gmail.com',
        to: email,
        subject: 'Security Check: Verify Your Account',
        html: `<p>Please click <a href="${trackingLink}">here</a> to verify your account.</p>`,
      };

      await transporter.sendMail(mailOptions);
    });

    return await this.phishingModel.create({
      email,
      status: 'pending',
    });
  }

  async updateStatus(email: string) {
    return this.phishingModel.findOneAndUpdate(
      { email },
      { status: 'clicked' },
      { new: true },
    );
  }

  async getAllAttempts() {
    return await this.phishingModel.find().exec();
  }

  async sendPhishingEmail(email: string) {
    const response = await this.httpService.axiosRef.post(
      'http://localhost:3000/phishing/send',
      { email },
    );

    return await this.phishingModel.create({ email, status: 'pending' });
  }
}
