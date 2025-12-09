import {
  Controller,
  Post,
  UseGuards,
  Body,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { access_token, user: userData } = await this.authService.login(user);

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true, // Assuming HTTPS or localhost secure context
      sameSite: 'lax',
      path: '/',
    });

    return userData;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
    return { message: 'Logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
