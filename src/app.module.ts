import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { OtpModule } from './otp/otp.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './users/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh.token/refresh-token.service';
import { AuthService } from './auth/auth.service';
import { PokemonService } from './pokemon/pokemon.service';
import { UserSchema } from './users/user.model';
import { PokemonSchema } from './pokemon/pokemon.model';
import { RefreshTokenSchema } from './refresh.token/refresh-token.model';
import { NewsService } from './news/news.service';
import { NewsModule } from './news/news.module';
import { NewsController } from './news/news.controller';
import { mongooseConfig } from './mongoose.config';
import { NewsSchema } from './news/news.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    UserModule,
    OtpModule,
    NewsModule,
    PokemonModule,
    // MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConfig,
  }),
    AuthModule
  ],
  controllers: [AppController,AuthController,NewsController],
  providers: [AppService,JwtStrategy,
    UserService,
    JwtService,
    RefreshTokenService,
    AuthService,
    PokemonService,
    NewsService
  ],
})
export class AppModule {}
