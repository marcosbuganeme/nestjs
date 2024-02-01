import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class VerifiedAuthDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: VerifiedAuthDto) {
    return this.authService.login(body.username, body.password);
  }
}
