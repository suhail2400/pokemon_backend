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
import { FavouritesSchema } from './favourites/favourite.model';
import { FavouritesModule } from './favourites/favourites.module';
import { FavouritesService } from './favourites/favourites.service';
import { FavouritesController } from './favourites/favourites.controller';
import { DailyCheckinModule } from './daily_checkin/daily_checkin.module';
import { DailyCheckinService } from './daily_checkin/daily_checkin.service';
import { DailyCheckinController } from './daily_checkin/daily_checkin.controller';
import { DailyCheckinSchema } from './daily_checkin/daily_checkin.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    MongooseModule.forFeature([{ name: 'Favourite', schema: FavouritesSchema }]),
    MongooseModule.forFeature([
      { name: 'DailyCheckin', schema: DailyCheckinSchema },
  ]),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    UserModule,
    OtpModule,
    NewsModule,
    PokemonModule,
    FavouritesModule,
    // MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConfig,
  }),
    AuthModule,
    DailyCheckinModule
  ],
  controllers: [AppController,AuthController,NewsController,FavouritesController,DailyCheckinController],
  providers: [AppService,JwtStrategy,
    UserService,
    JwtService,
    RefreshTokenService,
    AuthService,
    PokemonService,
    NewsService,
    FavouritesService,
    DailyCheckinService
  ],
})
export class AppModule {}
