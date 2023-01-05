import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import bcrypt from 'bcrypt';

import { CreateUserReqDto } from './dto/create-user.dto';
import { UpdateUserReqDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserReqDto): Promise<User> {
    if (await this.usersRepository.exists({ username: dto.username })) {
      throw new ConflictException(`User with username '${dto.username}' already exists!`);
    }
    dto.password = await this.hashPassword(dto.password);
    return this.usersRepository.create(dto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findUser(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ username: username });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(username: string, dto: Partial<User>): Promise<User> {
    const updatedUser = await this.usersRepository.updateUser(username, dto);
    if (!updatedUser) {
      throw new NotFoundException();
    }
    return updatedUser;
  }

  async removeUser(username: string): Promise<void> {
    const deletedUser = await this.usersRepository.removeUser(username);
    if (!deletedUser) {
      throw new NotFoundException();
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
