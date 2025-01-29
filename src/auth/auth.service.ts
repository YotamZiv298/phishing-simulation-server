import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { User } from '@users/schemas/user.schema';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<Partial<User>> {
    // TODO: move magic number to constant
    const hashedPassword = await bcrypt.hash(user.password, 10);

    let createdUser: User;

    try {
      createdUser = await this.usersService.create({
        email: user.email,
        password: hashedPassword,
      });
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async login(user: CreateUserDto) {
    let isUserValid;

    try {
      isUserValid = await this.validateUser(user.email, user.password);
    } catch (e) {
      new Logger().error(e);
      throw e;
    }

    if (!isUserValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;

    return result;
  }
}
