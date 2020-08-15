import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDTO } from '../dto';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserDTO => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
