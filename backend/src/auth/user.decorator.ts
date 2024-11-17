import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as session from 'express-session';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.session.user;
  },
);
