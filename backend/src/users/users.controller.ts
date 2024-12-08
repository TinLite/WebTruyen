import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { User } from 'src/auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Patch('update')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'wall', maxCount: 1 },
    ]),
  )
  async update(
    @User() userSession,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      wall?: Express.Multer.File;
    },
  ) {
    const user = await this.usersService.findOne(userSession.id);
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const fileMap = {
        avatar: files.avatar ? files.avatar[0] : undefined,
        wall: files.wall ? files.wall[0] : undefined,
      };
      await this.usersService.update(userSession.id, updateUserDto, fileMap);
    }
  }
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      await this.usersService.delete(id);
    }
  }

  @Get('profile/:id/detail')
  async findOne(@Param('id') id: string, @User() userSession) {
    if (id == 'me') {
      id = userSession.id;
    }
    // console.log(id);
    return await this.usersService.findOne(id);
  }

  @Get('list')
  async findAllUser(@User() userSession) {
    // if(!userSession){
    //   throw new UnauthorizedException('You are not login');
    // }
    // if (userSession.role != 'admin') {
    //   throw new ForbiddenException('You are not admin');
    // }
    const data = await this.usersService.getAllUser();
    return data;
  }
  @Patch('lock/:id')
  async lockUser(@Param('id') id: string, @User() userSession) {
    // if(!userSession){
    //   throw new UnauthorizedException('You are not login');
    // }
    // if (userSession.role != 'admin') {
    //   throw new ForbiddenException('You are not admin');
    // }
    return await this.usersService.lockUser(id);
  }
  @Patch('unlock/:id')
  async unlockUser(@Param('id') id: string, @User() userSession) {
    // if(!userSession){
    //   throw new UnauthorizedException('You are not login');
    // }
    // if (userSession.role != 'admin') {
    //   throw new ForbiddenException('You are not admin');
    // }
    return await this.usersService.unlockUser(id);
  }
}
