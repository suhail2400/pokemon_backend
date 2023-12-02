// auth.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { RefreshTokenService } from 'src/refresh.token/refresh-token.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async register(
    username: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<User> {
    return await this.userService.createUser(username, email, phone, password);
  }


  async login(
    email: string,
    password: string,
  ): Promise<{ access:string, refresh:string }> {
    const user = await this.userService.findUserByEmail(email);

    if (user && (await this.comparePasswords(password, user.password))) {
      // Generate access token
      const access = await this.generateAccessToken({
        userId: user.id,
        username: user.userName,
        email: user.email,
      });

      // Generate refresh token
      const refresh = await this.generateRefreshToken(user);


      return { access, refresh };
    }

    throw new NotFoundException('Invalid Credentials');
  }

  private async generateAccessToken(payload: any) :Promise<string>{
    const access = this.jwtService.sign(payload, {
      secret: 'asdfgh',
      expiresIn: '3m',
    });
    // const refresh = this.jwtService.sign(payload, {
    //   secret: process.env.REFRESH_TOKEN_SECRET,
    //   expiresIn: '7d',
    // });
    return access;
  }



  private async generateRefreshToken(user: User): Promise<string> {
    const token = this.jwtService.sign(
      { username: user.userName, email: user.email },

      {
        secret:'asdfgh',
        expiresIn: '7d',
      },
    );

    /* Create a new RefreshToken document if a refresh token
    doesnt already exist against this user or if the token has expired */
    // const existingTokenResult =
    //   await this.refreshTokenService.findRefreshTokenByUserId(user._id);

    //   if (existingTokenResult) {
    //     try {
    //       await this.jwtService.verify(existingTokenResult.token, {
    //         secret: process.env.REFRESH_TOKEN_SECRET,
    //       });
    //       console.log('A valid refresh token for this user already exists in DB')
    //     return existingTokenResult.token;
    //    } catch (error) {
    //     throw new InternalServerErrorException('Error during token generation')
    //    }
    //   }
      // If a valid token still exists in the DB use that instead
    await this.refreshTokenService.createRefreshToken(token, user);

    return token;
  }

  // Re-generating acccess token
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string } | null> {
    // Verify the refresh token
    const isValidRefreshToken =
      await this.jwtStrategy.verifyToken(refreshToken);

    if (isValidRefreshToken) {
      console.log('Token is valid');
      // Extract user email from the refresh token
      const decodedToken = this.jwtService.decode(refreshToken) as {
        username: string;
      };
      const username = decodedToken.username;

      // Generate a new access token
      const accessToken = await this.generateAccessToken({ username });
      return { accessToken };
    }

    return null;
  }

  private async comparePasswords(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }

  async logout(user: User): Promise<void> {
    await this.refreshTokenService.deleteRefreshToken(user._id);
  }
}