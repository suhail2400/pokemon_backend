import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {

  }

  async insertUser(userName:string, email: string, phone: number, password: String) {
    const newUser = new this.userModel({userName, email, phone, password});
    const result = await newUser.save();
    console.log(result);
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({id: user.id, userName: user.userName, email: user.email, phone:user.phone, password:user.password}));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return user;
  }

  async updateProduct(userId:string, userName:string, email:string, phone:number, password:string){
    const updatedUser = await this.findUser(userId);
    if(userName){
      updatedUser.userName = userName;
    }
    if(email){
      updatedUser.email = email;
    }
    if(phone){
      updatedUser.phone = phone;
    }
    if(password){
      updatedUser.password = password;
    }
    updatedUser.save();
  }

  private async findUser (id: string):Promise<User>{
    let user;
    try {
      user = await  this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException ('Could not find user');
    }
    if(!user){
      throw new NotFoundException ('Could not find user');
    }
    return user;
  }

  async deleteUser(userId:string){
    const userFound = this.findUser(userId)
    const result = await (await userFound).deleteOne();
    if(result){
      return true;
    }
  }
}