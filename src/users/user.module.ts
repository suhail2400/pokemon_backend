import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
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
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers: [UsersController],
    providers : [UserService]
})
export class UserModule {}