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
    @UploadedFiles() files:{ files:Express.Multer.File[]},
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
    @UploadedFiles() files: {files: Express.Multer.File[]},
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
  
}
