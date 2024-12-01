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
  ForbiddenException,
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
    if (req.session.user) {
      throw new ForbiddenException('You are already logged in');
    }
    req.session.user = req.user;
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req) {
    if (!req.session.user) {
      throw new ForbiddenException('You are not logged in');
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  @Get('protected')
  getProtected(@Request() req) {
    if (!req.session.user) {
      return { message: 'Unauthorized access' };
    }
    return { message: 'Protected data', user: req.session.user };
  }
  @Get('profile')
  getProfile(@Request() req) {
    if (!req.session.user) {
      return { message: 'Unauthorized access' };
    }
    return { user: req.session.user };
  }
}
