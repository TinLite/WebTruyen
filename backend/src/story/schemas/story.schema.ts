import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';

@Schema()
export class Story {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  genre: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  authorId: Users;

  @Prop()
  coverImage?: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    default: true,
  })
  status: boolean;
}
export const StorySchema = SchemaFactory.createForClass(Story);
