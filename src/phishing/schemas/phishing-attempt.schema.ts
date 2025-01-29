import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PhishingAttempt {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    default: 'pending',
  })
  status: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
