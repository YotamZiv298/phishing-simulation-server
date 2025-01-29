import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { jwtConstants } from '@auth/constants';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
