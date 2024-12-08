import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chapter } from 'src/chapter/schemas/chapter.schema';
import { Story } from 'src/story/schemas/story.schema';
import { Users } from 'src/users/schemas/users.schema';
@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  author: Users[];
  @Prop()
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Story' })
  storyId: Story;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
  })
  chapterId: Chapter;
  @Prop({
    default: Date.now,
  })
  created_at: Date;
  @Prop({
    default: Date.now,
  })
  updated_at: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  likes: Users[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  replyTo?: Comment;
  @Prop()
  hasReply?: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
