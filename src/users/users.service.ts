import { Injectable } from '@nestjs/common';
import { UsersRepository } from './data-layer/repository/users.repository';
import { UpdatePasswordDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';
import { User } from './data-layer/schemas/user.schema';
import { UsersServiceInterface } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: ObjectId): Promise<User> {
    return this.usersRepository.findById(userId);
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(
    email: string,
    name: string,
    passwordToBeCrypted: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(passwordToBeCrypted, salt);
    return this.usersRepository.create({
      email,
      name,
      password,
    });
  }
  async updateUser(
    userId: ObjectId,
    userUpdates: UpdatePasswordDto,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userUpdates.password, salt);
    return this.usersRepository.findByIdAndUpdate(userId, password);
  }
  async deleteUser(userId: ObjectId): Promise<User> {
    return this.usersRepository.findOneAndDelete(userId);
  }
}
