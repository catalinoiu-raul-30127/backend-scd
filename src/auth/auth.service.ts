import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/data-layer/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/users/dto/login-user.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (user && passwordsMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
  async login(user: Partial<User>): Promise<Partial<UserLoginDto>> {
    return {
      access_token: this.jwtService.sign(user, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      }),
    };
  }
}
