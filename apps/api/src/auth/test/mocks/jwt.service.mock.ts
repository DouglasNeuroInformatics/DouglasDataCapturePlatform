import { JwtService } from '@nestjs/jwt';

import { createMock } from '@golevelup/ts-jest';

export const MockJwtService = createMock<JwtService>({
  signAsync: () => {
    return Promise.resolve('token');
  }
});