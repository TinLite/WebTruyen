import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as session from 'express-session';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
  return this.authService.login(req.user);
  }

  @Get('protected')
  getProtected(@Request() req) {
    if (!req.session.user) {
      return { message: 'Unauthorized access' };
    }
    return { message: 'Protected data', user: req.session.user };
  }
}
