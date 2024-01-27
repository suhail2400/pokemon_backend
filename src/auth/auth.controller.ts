import { Body, Controller, Post, Get, UnauthorizedException, UseGuards, Request, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.model';


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}


    @Post('signup')
    async register(
      @Body('userName') name: string,
      @Body('email') email: string,
      @Body('phone') phone: string,
      @Body('password') password: string,
    ): Promise<User> {
      return this.authService.register(name, email, phone, password);
    }

    @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access: string; refresh: string }> {
    return await this.authService.login(email, password);
  }

  @Post('refresh-token')
  async refreshAccessToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string } | { message: string }> {
    const result = await this.authService.refreshAccessToken(refreshToken);

    if (result) {
      return result;
    } else {
      // return { message: 'Invalid refresh token.' };
      throw new UnauthorizedException('Could not to generate new access token!')
    }
  }

  @Delete('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user);
  }

  // To test a protected route with access token
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protected(@Request() req) {
    return { message: 'You are authorized to be here', user: req.user };
  }
}
