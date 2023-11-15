import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.model";
import { UsersController } from "./users.controller";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers: [UsersController],
    providers : [UserService]
})
export class UserModule {}