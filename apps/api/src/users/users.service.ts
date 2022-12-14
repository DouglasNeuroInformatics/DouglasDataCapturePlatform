import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username: username });
  }

  async create(user: User): Promise<User> {
    if (await this.usersRepository.exists({ username: user.username })) {
      throw new BadRequestException(`User with username '${user.username}' already exists!`);
    }
    return this.usersRepository.create(user);
  }

  async delete(username: string): Promise<void> {
    return this.usersRepository.deleteOne({ username })
  }
}
