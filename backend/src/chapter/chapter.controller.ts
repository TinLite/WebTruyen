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
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { User } from 'src/auth/user.decorator';
import mongoose, { Schema } from 'mongoose';
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
      throw new UnauthorizedException('User not authenticated');
    }
    const story = await this.storyService.findOne(
      createChapterDto.StoryId.toString(),
    );
    if (!story) {
      throw new NotFoundException('Story not found ');
    }
    if (story.authorId.toString() !== userSession.id) {
      throw new Error('You are not the author of this story');
    }
    await this.storyService.updateTimeStamp(
      createChapterDto.StoryId.toString(),
    );
    return this.chapterService.createChapter(userSession.id, createChapterDto);
  }
  @Patch('/:chapterId/update/story/:storyId')
  async updateChapter(
    @Body() updateChapterDto: UpdateChapterDto,
    @User() userSession,
    @Param('storyId') storyId,
    @Param('chapterId') chapterId,
  ) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      throw new BadRequestException('Invalid chapter ID');
    }
    const post = await this.storyService.findOne(storyId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const chapter = await this.chapterService.findOne(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    // console.log(post.authorId);
    // console.log(userSession.id);
    if (post.authorId.toString() !== userSession.id) {
      throw new ForbiddenException('User not authorized to update this story');
    }
    return await this.chapterService.updateChapter(chapterId, updateChapterDto);
  }
  @Delete('delete/:chapterId/story/:storyId')
  async deleteChapter(
    @Param('chapterId') chapterId,
    @Param('storyId') storyId,
    @User() userSession,
  ) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      throw new BadRequestException('Invalid chapter ID');
    }
    const post = await this.storyService.findOne(storyId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const chapter = await this.chapterService.findOne(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    console.log(chapter.UserId);
    console.log(userSession.id);
    if (
      chapter.UserId.toString() !== userSession.id ||
      userSession.role === 'admin'
    ) {
      throw new ForbiddenException(
        'User not authorized to delete this chapter',
      );
    }
    return await this.chapterService.deleteChapter(chapterId);
  }
  @Get('list/:storyId')
  async findAllChapter(@User() userSession, @Param('storyId') storyId) {
    const data = await this.chapterService.findAllChapterByStoryId(storyId);
    console.log(data);
    return data;
  }
}
