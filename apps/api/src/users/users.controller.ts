import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateUserRequestDto } from '@dnp/common/dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  findUser(@Param('username') username: string): Promise<User | null> {
    return this.usersService.findByUsername(username);
  }

  @Post()
  create(@Body() createUserRequestDto: CreateUserRequestDto): Promise<User> {
    return this.usersService.create(createUserRequestDto);
  }

  @Delete(':username')
  delete(@Param('username') username: string): Promise<void> {
    return this.usersService.delete(username);
  }
}
