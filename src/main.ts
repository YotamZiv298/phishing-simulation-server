import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { BetterLoggerService } from 'nest-elastic-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(BetterLoggerService);

  app.useLogger(logger);

  await app.listen(process.env.PORT);
}
bootstrap().catch(console.error);
