import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/user.decorator';
import { StoryService } from 'src/story/story.service';
import { UsersService } from 'src/users/users.service';
import mongoose, { mongo } from 'mongoose';
import { ChapterService } from '../chapter/chapter.service';
import * as session from 'express-session';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly storyService: StoryService,
    private readonly usersService: UsersService,
    private readonly ChapterService: ChapterService,
  ) {}

  @Post('/create/story/:storyId/chapter/:chapterId')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('storyId') storyId: string,
    @Param('chapterId') chapterId: string,
    @User() userSession,
  ) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    const post = await this.storyService.findOne(storyId);
    // console.log(post);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (!userSession) {
      throw new UnauthorizedException('User not authenticated');
    }
    const authorId = userSession.id;
    return await this.commentsService.create(
      authorId,
      storyId,
      chapterId,
      createCommentDto,
    );
  }

  @Patch('/update/:commentId')
  async update(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('commentId') commentId: string,
    @User() userSession,
  ) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    if (comment.author.toString() !== userSession.id) {
      throw new ForbiddenException(
        'User not authorized to update this comment',
      );
    }
    return await this.commentsService.update(
      userSession.id,
      commentId,
      updateCommentDto,
    );
  }

  @Delete('/delete/:commentId')
  async remove(@Param('commentId') commentId: string, @User() userSession) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    const post = await this.storyService.findOne(comment.storyId.toString());
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    if (
      comment.author.toString() !== userSession.id &&
      post.authorId.toString() !== userSession.id
    ) {
      throw new ForbiddenException(
        'User not authorized to delete this comment',
      );
    }
    return await this.commentsService.remove(commentId);
  }

  @Post('/reply/:commentId')
  async reply(
    @Body() replyToCommentDto: CreateCommentDto,
    @Param('commentId') commentId: string,
    @User() userSession,
  ) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    return await this.commentsService.reply(
      userSession.id,
      comment.storyId,
      comment.chapterId,
      commentId,
      replyToCommentDto,
    );
  }

  @Get('/list/:storyId')
  async getCommentByPostId(@Param('storyId') storyId: string) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    const post = await this.storyService.findOne(storyId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.commentsService.getCommentByPostId(storyId);
  }

  @Post('/like/:commentId')
  async likeComment(
    @Param('commentId') commentId: string,
    @User() userSession,
  ) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.likes.includes(userSession.id)) {
      throw new BadRequestException('User already liked this comment');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    return await this.commentsService.likeComment(commentId, userSession.id);
  }

  @Delete('/unlike/:commentId')
  async unlikeComment(
    @Param('commentId') commentId: string,
    @User() userSession,
  ) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (!comment.likes.includes(userSession.id)) {
      throw new BadRequestException('User has not liked this comment');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    return await this.commentsService.unlikeComment(commentId, userSession.id);
  }
  @Get('/list/story/:storyId/chapter/:chapterId')
  async getCommentByChapterId(
    @Param('storyId') storyId: string,
    @Param('chapterId') chapterId: string,
    @User() userSession,
  ) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      throw new BadRequestException('Invalid chapter ID');
    }
    if (!userSession) {
      throw new UnauthorizedException('User not authenticated');
    }
    // console.log(userSession.role);
    // if (!userSession.role.includes('admin')) {
    //   throw new ForbiddenException('User not authorized to view this comment');
    // }
    const post = await this.storyService.findOne(storyId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const chapter = await this.ChapterService.findOne(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    return await this.commentsService.getCommentByChapterId(storyId, chapterId);
  }
  @Get('/listall')
  async getComment() {
    return await this.commentsService.getAllComment();
  }
  @Get('count')
  async countComment() {
    const users = await this.usersService.countUser();
    const stories = await this.storyService.countStory();
    const comment = await this.commentsService.countComment();
    return {
      users: users,
      stories: stories,
      comment: comment,
    };
  }
  @Delete('admin/delete/:commentId')
  async deleteComment(@Param('commentId') commentId, @User() userSession) {
    console.log(userSession.role);
    if (!userSession) {
      throw new UnauthorizedException('User not authenticated');
    }
    if (!userSession.role.includes('admin')) {
      throw new ForbiddenException('User not authorized to delete comment');
    }
    return await this.commentsService.removeComment(commentId);
  }
}
