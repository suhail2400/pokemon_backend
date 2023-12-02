// otp.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  generateOtp(): Object {
    const otpAuthUrl = this.otpService.generateOtp();
    return otpAuthUrl;
  }

  @Post('verify')
  verifyOtp(@Body('secret') secret: string, @Body('otp') otp: string): string {
    const isVerified = this.otpService.verifyOtp(secret, otp);
    return isVerified ? 'OTP is valid' : 'OTP is not valid';
  }
}
