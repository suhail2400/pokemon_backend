import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()

export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {

  }

  async createUser(userName:string, email: string, phone: string, password: string) {
    let hashedPass = await bcrypt.hash(password,3);
    const newUser = new this.userModel({userName, email, phone, password:hashedPass});
    const result = await newUser.save();
    console.log(result);
    return newUser;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({id: user.id, userName: user.userName, email: user.email, phone:user.phone, password:user.password}));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return user;
  }

  // find one user by email
  async findUserByEmail(email: string) {
    const user = await this.findOneByEmail(email);
    return user;
  }

  // find one user by username
  async findUserByName(userName: string) {
    const user = await this.findOneByName(userName);
    return user;
  }

  // Helper method to find one user from mongo db
  private async findOneByName(userName: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findOne({ userName }).exec();
    } catch (error) {
      console.log('How')
      throw new NotFoundException('Could not find this user');
    }
    if (!user) {
      console.log('hi');
      throw new NotFoundException('Could not find this user');
    }
    return user;
  }

  // Helper method to find one user from mongo db
  private async findOneByEmail(email: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find this user');
    }
    if (!user) {
      throw new NotFoundException('Could not find this user');
    }
    return user;
  }

  async updateUser(userId:string, userName:string, email:string, phone:string, password:string){
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
      password = await bcrypt.hash(password,3)
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