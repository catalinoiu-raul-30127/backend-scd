import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserLoginDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<Partial<UserLoginDto>> {
    const user = req.user;
    return this.authService.login(user);
  }
}
