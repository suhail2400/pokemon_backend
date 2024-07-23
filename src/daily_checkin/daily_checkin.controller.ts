import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { DailyCheckinService } from './daily_checkin.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/users/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('daily-checkin')
export class DailyCheckinController {
  constructor(
    private readonly checkinService: DailyCheckinService,
    private readonly userService: UserService,
  ) {}
   @UseGuards(AuthGuard('jwt'))
  @Post('history')
  async getUserHistory(@Body() body: { email: string }) {
    const user = await this.userService.findUserByEmail(body.email);
    const history = await this.checkinService.getCheckinHistory(user);
    return {
      joinDate: user.join_date,
      history: history,
    };
  }

  // @UseGuards(AuthGuard('jwt'))
  @Patch('check-in')
  checkIn(@Body() body: { email: string }) {
    return this.checkinService.checkInUser(body.email);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Post('auto-checkin')
  async checkInByCron() {
    await this.checkinService.createDailyCheckinByCron();
  }
}