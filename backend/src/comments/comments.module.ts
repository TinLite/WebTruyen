import { Module, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { UsersModule } from 'src/users/users.module';
import { StoryModule } from 'src/story/story.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    StoryModule,
    UsersModule 
  ], 
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
