import { UnauthorizedException } from '@nestjs/common';

import { createMock } from '@golevelup/ts-jest';

import { mockAdminUser } from '@/users/test/stubs/user.stubs';
import { UsersService } from '@/users/users.service';

export const MockUsersService = createMock<UsersService>({
  findUser: (username: string) => {
    if (username === mockAdminUser.username) {
      return Promise.resolve(mockAdminUser);
    } else {
      throw new UnauthorizedException();
    }
  }
});
