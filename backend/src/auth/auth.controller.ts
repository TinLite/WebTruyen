import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changpass.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { User } from './user.decorator';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    if (req.session.user) {
      throw new ForbiddenException('You are already logged in');
    }
    if (!req.user.status) {
      throw new ForbiddenException('User is banned');
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
  @Patch('changePassword')
  async changpass(
    @User() userSession,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    if (!userSession) {
      throw new UnauthorizedException('User not Unauthorized');
    }
    const userId = userSession.id;
    const user = await this.usersService.findOneByIdWithPassword(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { oldPass, newPass } = changePasswordDto;
    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      throw new BadRequestException('OldPassword is not match');
    }
    return await this.authService.changPass(userId, oldPass, newPass);
  }
}
