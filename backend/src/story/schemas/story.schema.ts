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
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  })
  AuthorId: Users;
  @Prop()
  CoverImage: string;
  @Prop({
    default: Date.now,
  })
  createdAt: Date;
  @Prop({
    default: Date.now,
  })
  updatedAt: Date;
  @Prop({
    default: 1,
  })
  status: boolean;
}
export const StorySchema = SchemaFactory.createForClass(Story);
