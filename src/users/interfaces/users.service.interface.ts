import { ObjectId } from 'mongoose';
import { User } from '../data-layer/schemas/user.schema';
import { UpdatePasswordDto } from '../dto/update-user.dto';

export interface UsersServiceInterface {
  getUserById(userId: ObjectId): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUsers(): Promise<User[]>;
  createUser(
    email: string,
    name: string,
    passwordToBeCrypted: string,
  ): Promise<User>;
  updateUser(userId: ObjectId, userUpdates: UpdatePasswordDto): Promise<User>;
  deleteUser(userId: ObjectId): Promise<User>;
}
