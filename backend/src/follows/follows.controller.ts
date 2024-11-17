import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { User } from 'src/auth/user.decorator';
import { UsersService } from 'src/users/users.service';
@Controller('follows')
export class FollowsController {
  constructor(
    private readonly followsService: FollowsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/add/:storyId')
  async followStory(@Param('storyId') storyId: string, @User() userSession) {
    if (!userSession) {
      throw new UnauthorizedException('User not authenticated');
    }
    // console.log(userSession);
    const user = await this.followsService.findOneUser(userSession.id);
    // console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.followstory) {
      user.followstory = [];
    }
    if(user.followstory.includes(storyId)) {
      throw new BadRequestException('Story already followed');
    }
    console.log(userSession.id, storyId);
    return await this.followsService.followStory(userSession.id, storyId);
  }
}


