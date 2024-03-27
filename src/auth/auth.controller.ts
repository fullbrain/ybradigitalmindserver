import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    const user = await this.authService.signup(body);
    const token = this.authService.createAccessToken(user);

    return token;
  }

  @Post('signin')
  signin(@Body() body: AuthDto) {
    return this.authService.signin(body);
  }

  @Post('refresh')
  refresh(@Body() body: { token: string }) {
    return this.authService.refresh(body.token);
  }
}
