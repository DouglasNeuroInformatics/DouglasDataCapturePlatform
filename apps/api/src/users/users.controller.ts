import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto';
import { UpdateUserReqDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserReqDto): Promise<CreateUserResDto> {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  findUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findUser(username);
  }

  @Patch(':username')
  updateUser(@Param('username') username: string, @Body() dto: UpdateUserReqDto): Promise<User> {
    return this.usersService.updateUser(username, dto);
  }

  @Delete(':username')
  removeUser(@Param('username') username: string): Promise<void> {
    return this.usersService.removeUser(username);
  }
}
