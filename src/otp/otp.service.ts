// otp.service.ts
import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
    export class OtpService {
  generateOtp(): Object {
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
      });
      // secret.otpauth_url
    const url:string = secret.otpauth_url
    let rev = this.getReversedSubstring(url,0,url.length)
     rev = rev.substring(0,32)
    let code = this.getReversedSubstring(rev,0,rev.length)
    return {secret:code, otp: otp,};
  }


  getReversedSubstring(inputString: string, startIndex: number, length: number): string {
    const reversedString = inputString.split('').reverse().join('');
    const endIndex = startIndex + length;
    const reversedSubstring = reversedString.substring(reversedString.length - endIndex, reversedString.length - startIndex);
    return reversedSubstring;
}


  verifyOtp(secret: string, otp: string): boolean {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: otp,
      window: 2, // Allow for a time window to account for clock skew
    });
    return verified;
  }
}
