import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    InternalServerErrorException,
  } from '@nestjs/common';

  import { UserService } from './user.service';

  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UserService) {}

    // @Post()
    // async addUser(
    //   @Body('userName') userName: string,
    //   @Body('email') email: string,
    //   @Body('phone') phone: string,
    //   @Body('password') password: string
    // ) {
    //   const generatedId = await this.userService.createUser(
    //     userName,
    //     email,
    //     phone,
    //     password
    //   );
    //   return { id: generatedId };
    // }

    @Get()
    async getAllUsers() {
      const users = await this.userService.getUsers();
      return users;
    }

    @Get(':id')
    getUser(@Param('id') userId: string){
      return this.userService.getSingleUser(userId);
    }

    // @Patch(':id')
    // async updateProduct(@Param('id') userId: string, @Body('userName') userName: string,
    // @Body('email') email: string,
    // @Body('phone') phone: string,
    // @Body('password') password: string
    // ){
    //   await this.userService.updateUser(userId,userName,email,phone,password);
    //   return null;
    // }

    @Delete (':id')
     removeProduct(@Param('id') userId:string) {
      return  this.userService.deleteUser(userId);
    }

    // Get one user by email
    @Post()
    async getUserByEmail(@Body('email') email: string) {
      const result = await this.userService.findUserByEmail(email);
      return result;
    }

    // Reset Password
    @Patch('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    // console.log('/users/reset-password called');
    try {
      const user = await this.userService.findUserByEmail(email);
       console.log(user)
      return await this.userService.updateUser(
        user._id,
        null,
        null,
        null,
        password,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to reset password',error);
    }
  }

}
