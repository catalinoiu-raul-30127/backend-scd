import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User } from './data-layer/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/:id')
  async getUserById(@Res() res, @Param('id') id: ObjectId): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No user found' });
    }
    const { password, ...returnUser } = user;
    return res.status(HttpStatus.OK).json(returnUser);
  }
  @Get()
  async getUsers(@Res() res): Promise<User[]> {
    const users = await this.userService.getUsers();
    if (users.length === 0) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No users found' });
    }
    return res.status(HttpStatus.OK).json(users);
  }
  @Post()
  async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.createUser(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
    );
    return res.status(HttpStatus.CREATED).json({
      message: 'User successfully created',
      user: user,
    });
  }
  //   @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @Res() res,
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No user found to update' });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Password successfully updated',
    });
  }
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id: ObjectId): Promise<User> {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No user found to delete' });
    }
    return res.status(HttpStatus.OK).json({
      message: 'User successfully deleted',
      user: user,
    });
  }
}
