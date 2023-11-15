import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';

  import { UserService } from './user.service';

  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addProduct(
      @Body('userName') userName: string,
      @Body('email') email: string,
      @Body('phone') phone: number,
      @Body('password') password: string
    ) {
      const generatedId = await this.userService.insertUser(
        userName,
        email,
        phone,
        password
      );
      return { id: generatedId };
    }

    @Get()
    async getAllUsers() {
      const users = await this.userService.getUsers();
      return users;
    }

    @Get(':id')
    getProduct(@Param('id') userId: string){
      return this.userService.getSingleUser(userId);
    }

    @Patch(':id')
    async updateProduct(@Param('id') userId: string, @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('password') password: string
    ){
      await this.userService.updateProduct(userId,userName,email,phone,password);
      return null;
    }

    @Delete (':id')
     removeProduct(@Param('id') userId:string) {
      return  this.userService.deleteUser(userId);
    }

}
