import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Mongoose } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';
import { Story } from '../../story/schemas/story.schema';

@Schema()
export class Chapter {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  UserId: Users;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  })
  StoryId: Story;
  @Prop()
  Title: string;
  @Prop()
  Content: String;
  @Prop()
  ChapterNumber: string;
  @Prop({
    type: Date.now,
  })
  CreateAt: Date;
  @Prop({
    default: true,
  })
  Status: boolean;
}
export const ChapterSchema = SchemaFactory.createForClass(Chapter);
