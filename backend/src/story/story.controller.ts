import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  Type,
  UploadedFiles,
  UploadedFile,
  NotAcceptableException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { User } from 'src/auth/user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'files',
        maxCount: 1,
      },
    ]),
  )
  create(
    @Body() createStoryDto: CreateStoryDto,
    @User() userSession,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    const authorId = userSession.id;
    return this.storyService.create(authorId, createStoryDto, files.files);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'files',
        maxCount: 1,
      },
    ]),
  )
  async updateStory(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
    @User() userSession,
  ) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    const story = await this.storyService.findOne(id);
    if (!story) {
      throw new Error('Story not found');
    }
    console.log(story.authorId.toString(), userSession.id);
    if (story.authorId.toString() !== userSession.id) {
      throw new Error('You are not the author of this story');
    }
    return this.storyService.updateStory(id, updateStoryDto, files.files);
  }
  @Patch('delete/:id')
  async deleteStory(@Param('id') id: string, @User() userSession) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    const story = await this.storyService.findOne(id);
    if (!story) {
      throw new NotAcceptableException('Story not found');
    }
    // console.log(userSession.role)
    if (!userSession) {
      throw new UnauthorizedException('User not authenticated');
    }
    if (
      story.authorId.toString() !== userSession.id &&
      !userSession.role.includes('admin')
    ) {
      throw new ForbiddenException('You are not the author of this story');
    }
    return this.storyService.deleteStory(id);
  }
  @Get('list')
  async listStory() {
    return this.storyService.findAll();
  }
  @Post('admin/lock/:id')
  async lockStory(@Param('id') id: string, @User() userSession) {
    if (!userSession) {
      throw new UnauthorizedException('User not authenticated');
    }
    const story = await this.storyService.findOne(id);
    if (!story) {
      throw new NotAcceptableException('Story not found');
    }
    if (!userSession.role.includes('admin')) {
      throw new ForbiddenException('You are not admin');
    }
    return this.storyService.lockStory(id);
  }
  @Get('/newchapter/list')
  async listStoryNewChapter() {
    return await this.storyService.getStoriesWithNewestChapter();
  }
  @Get('/new/list')
  async listNewStory() {
    return await this.storyService.getStoriesNew();
  }
  @Get('/rating/list')
  async listStoryRating() {
    return await this.storyService.getStoriesWithMostRating();
  }
}
