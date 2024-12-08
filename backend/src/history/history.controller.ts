import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { User } from 'src/auth/user.decorator';
import { StoryService } from '../story/story.service';
import mongoose from 'mongoose';
import { ChapterService } from 'src/chapter/chapter.service';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly storyService: StoryService,
    private readonly chapterService: ChapterService,
  ) {}

  @Post('/create/story/:storyId/chapter/:chapterId')
  async createHistory(
    @Body() createHistory: CreateHistoryDto,
    @User() userSession,
    @Param('storyId') storyId: string,
    @Param('chapterId') chapterId: string,
  ) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      throw new BadRequestException('Invalid story ID');
    }
    const post = await this.storyService.findOne(storyId);
    console.log(post);
    if (!post) {
      throw new NotFoundException('Story not found');
    }
    const chapter = await this.chapterService.findOne(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    if (!userSession) {
      throw new UnauthorizedException('User not Unauthorized');
    }
    const userId = userSession.id;
    return await this.historyService.createHistory(
      userId,
      storyId,
      chapterId,
      createHistory,
    );
  }
  @Get('/list')
  async findAllHistory(@User() userSession) {
    if (!userSession) {
      throw new UnauthorizedException('User not Unauthorized');
    }
    const userId = userSession.id;
    return await this.historyService.findAllHistory(userId);
  }
  @Get('/story/:storyId/chapter/:chapterId')
  async findOneHistory(
    @User() userSession,
    @Param('storyId') storyId,
    @Param('chapterId') chapterId,
  ) {
    if (!userSession) {
      throw new UnauthorizedException('User not Unauthorized');
    }
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      throw new BadRequestException('Invalid story ID');
    }
    const post = await this.storyService.findOne(storyId);
    // console.log(post);
    if (!post) {
      throw new NotFoundException('Story not found');
    }
    const chapter = await this.chapterService.findOne(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    const userId = userSession.id;
    return await this.historyService.findOneHistory(userId, storyId, chapterId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
