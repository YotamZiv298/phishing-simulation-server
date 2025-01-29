import { registerAs } from '@nestjs/config';
import { EnvironmentVariables } from '@src/env.validation';
import { validateUtil } from '@src/validate-util';

export interface IAppConfig {
  nodeEnv: string;
  port: number;
}

export default registerAs('app', () => {
  validateUtil(process.env, EnvironmentVariables);

  return {
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT!),
  };
});
