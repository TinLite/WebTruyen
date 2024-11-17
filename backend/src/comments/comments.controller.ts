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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/user.decorator';
import { StoryService } from 'src/story/story.service';
import { UsersService } from 'src/users/users.service';
import mongoose, { mongo } from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly storyService: StoryService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/create/:storyId')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('storyId') storyId: string,
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
      throw new ForbiddenException('User not authenticated');
    }
    const authorId = userSession.id;
    return await this.commentsService.create(
      authorId,
      storyId,
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
    const post = await this.storyService.findOne(comment.storyId);
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
  async likeComment(@Param('commentId') commentId: string, @User() userSession) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if(comment.likes.includes(userSession.id)){
      throw new BadRequestException('User already liked this comment');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    return await this.commentsService.likeComment(commentId, userSession.id);
  }

  @Delete('/unlike/:commentId')
  async unlikeComment(@Param('commentId') commentId: string, @User() userSession) {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if(!comment.likes.includes(userSession.id)){
      throw new BadRequestException('User has not liked this comment');
    }
    if (!userSession) {
      throw new ForbiddenException('User not authenticated');
    }
    return await this.commentsService.unlikeComment(commentId, userSession.id);
  }
  
}
