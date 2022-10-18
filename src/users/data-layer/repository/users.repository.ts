import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findById(userFilterQuery).lean();
  }
  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery).lean();
  }
  async find(usersFilterQuery?: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery).lean();
  }
  async create(user: User): Promise<User> {
    const userList = await this.find({});
    let unique = true;
    userList.forEach((element) => {
      if (element.email === user.email) {
        unique = false;
      }
    });
    if (unique) {
      const newUser = new this.userModel(user);
      return newUser.save();
    } else {
      throw new Error(`The email ${user.email} is already in use`);
    }
  }
  async findByIdAndUpdate(
    userFilterQuery: ObjectId,
    password: string,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      { _id: userFilterQuery },
      { $set: { password: password } },
      { new: true },
    );
  }
  async findOneAndDelete(userFilterQuery: ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete({ _id: userFilterQuery });
  }
}
