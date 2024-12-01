import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { User } from 'src/auth/user.decorator';
import { Schema } from 'mongoose';
import { StoryService } from 'src/story/story.service';

@Controller('chapter')
export class ChapterController {
  constructor(
    private readonly chapterService: ChapterService,
    private readonly storyService: StoryService,
  ) {}

  @Post('/create')
  async createChapter(
    @Body() createChapterDto: CreateChapterDto,
    @User() userSession,
  ) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    const story = await this.storyService.findOne(createChapterDto.StoryId.toString());
    if (!story) {
      throw new NotFoundException('Story not found ');
    }
    if (story.authorId.toString() !== userSession.id) {
      throw new Error('You are not the author of this story');
    }
    return this.chapterService.createChapter(
      userSession.id,
      createChapterDto,
    );
  }
}
