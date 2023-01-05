import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { JwtPayload } from '@dnp/common';
import { Request } from 'express';

export const ParseRequestUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    if (!data) {
      return request.user;
    }
    return (request.user as JwtPayload)[data];
  }
);
