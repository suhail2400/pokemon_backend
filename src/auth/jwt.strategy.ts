// jwt.strategy.ts
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh.token/refresh-token.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserByEmail(payload.email);
    const userHasRefreshTokenInDB = await this.refreshTokenService.findRefreshTokenByUserId(user._id)
    console.log('strategy',userHasRefreshTokenInDB)
    if (!user || !userHasRefreshTokenInDB) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      console.log('decoded token',decodedToken)
      const refreshToken =
        await this.refreshTokenService.findRefreshToken(token);
        if(refreshToken) console.log('Token Found in DB,')
      return !!refreshToken && decodedToken.email == refreshToken.email
    } catch (error) {
      console.log('Error in verifyToken()')
      return false;
    }
  }
}