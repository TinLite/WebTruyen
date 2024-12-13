import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import * as passport from 'passport';
import { CommentsModule } from './comments.module';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentsModel: Model<Comment>,
  ) {}
  async create(
    authorId,
    postId,
    chapterId,
    createCommentDto: CreateCommentDto,
  ) {
    const data = await this.commentsModel.create({
      ...createCommentDto,
      author: authorId,
      storyId: postId,
      chapterId: chapterId,
    });
    return {
      id: data._id,
    };
  }
  async update(authorId, commentId, updateCommentDto: UpdateCommentDto) {
    const data = await this.commentsModel.findByIdAndUpdate(
      commentId,
      updateCommentDto,
      { new: true },
    );
    return {
      id: data._id,
    };
  }
  async findOne(commentId: string) {
    return await this.commentsModel.findById(commentId).exec();
  }
  async remove(commentId: string) {
    return await this.commentsModel.findByIdAndDelete(commentId).exec();
  }
  async reply(
    authorId,
    postId,
    commentId,
    chapterId,
    createCommentDto: CreateCommentDto,
  ) {
    await this.commentsModel.findByIdAndUpdate(commentId, {
      $set: {
        hasReply: true,
      },
    });
    const comment = await this.commentsModel.create({
      ...createCommentDto,
      author: authorId,
      storyId: postId,
      chapterId: chapterId,
      replyTo: commentId,
    });
    return {
      id: comment._id,
    };
  }

  async getCommentByPostId(postId: string) {
    return await this.commentsModel
      .find({ storyId: postId })
      .populate('author', 'username')
      .exec();
  }
  async getCommentByChapterId(storyId, chapterId) {
    const data = await this.commentsModel
      .find({ chapterId: chapterId })
      .populate({
        path: 'storyId',
        select: 'status',
      })
      .populate('author', 'username')
      .exec();
    const result = data.filter(
      (comment) => comment.storyId && comment.storyId.status === true,
    );
    return result;
  }
  async getAllComment() {
    return await this.commentsModel
      .find()
      .populate('author', 'username')
      .populate('storyId', 'title')
      .populate('chapterId', 'ChapterNumber')
      .sort({ created_at: -1 })
      .exec();
  }
  async likeComment(commentId: string, authorId: string) {
    await this.commentsModel.findByIdAndUpdate(
      commentId,
      {
        $push: {
          likes: authorId,
        },
      },
      { new: true },
    );
  }

  async unlikeComment(commentId: string, authorId: string) {
    await this.commentsModel.findByIdAndUpdate(
      commentId,
      {
        $pull: {
          likes: authorId,
        },
      },
      { new: true },
    );
  }
  async countComment() {
    const data = await this.commentsModel.find().exec();
    return data.length;
  }
  async removeComment(commentId) {
    return await this.commentsModel.findByIdAndDelete(commentId).exec();
  }
}
