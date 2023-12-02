//Auth Module

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from 'src/users/user.model';
import { UserModule } from 'src/users/user.module';
import { UserService } from 'src/users/user.service';
import { RefreshTokenService } from 'src/refresh.token/refresh-token.service';
import { RefreshTokenSchema } from 'src/refresh.token/refresh-token.model';


@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn:config.get<string | number>('JWT_EXPIRES')}
        }
      }
    }),
    MongooseModule.forFeature([{name:'User', schema:UserSchema}]),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [AuthController,],
  providers: [
    UserService,
    AuthService,
    RefreshTokenService,
    JwtStrategy,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
