import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Users } from 'src/users/schemas/users.schema';
import { Story } from '../../story/schemas/story.schema';
import { Chapter } from '../../chapter/schemas/chapter.schema';
import mongoose from 'mongoose';

@Schema()
export class History {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  userId: Users;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  })
  storyId: Story;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
  })
  chapterId: Chapter;
  @Prop({
    default: Date.now,
  })
  readDate: Date;
  @Prop({ default: true })
  status: boolean;
}
export const HistorySchema = SchemaFactory.createForClass(History);
