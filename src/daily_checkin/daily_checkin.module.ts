import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.model';
import { DailyCheckinSchema } from './daily_checkin.model';
import { DailyCheckinService } from './daily_checkin.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'DailyCheckin', schema: DailyCheckinSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [DailyCheckinService]
})
export class DailyCheckinModule {}