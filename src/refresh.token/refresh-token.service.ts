// refresh-token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from './refresh-token.model';
import { User } from 'src/users/user.model';

@Injectable()
export class RefreshTokenService {
  constructor(@InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>) {}

  async createRefreshToken(token:string,user: User): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenModel.create({token:token,userId:user.id,email:user.email})
    return  refreshToken.save();
  }

  async findRefreshToken(token: string){
    return await this.refreshTokenModel.findOne({ token }).exec();
  }
  async findRefreshTokenByUserId(userId: string){
    console.log('refresh token',await this.refreshTokenModel.findOne({ userId:userId }).exec())
    return await this.refreshTokenModel.findOne({ userId:userId }).exec();
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await this.refreshTokenModel.findOneAndDelete({ token }).exec();
  }
  async deleteRefreshTokensByUser(userId: string): Promise<void> {
    await this.refreshTokenModel.deleteMany({ userId: userId }).exec();
  }

}