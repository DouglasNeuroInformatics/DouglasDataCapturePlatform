import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import bcrypt from 'bcrypt';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ username: username });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(user: User): Promise<User> {
    if (await this.usersRepository.exists({ username: user.username })) {
      throw new ConflictException(`User with username '${user.username}' already exists!`);
    }
    user.password = await this.hashPassword(user.password);
    return this.usersRepository.create(user);
  }

  async delete(username: string): Promise<void> {
    const deleted = await this.usersRepository.deleteOne({ username });
    if (!deleted) {
      throw new NotFoundException();
    }
  }

  async isUser(username: string): Promise<boolean> {
    return this.usersRepository.exists({ username });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
