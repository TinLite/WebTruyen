import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { Story } from 'src/story/schemas/story.schema';

@Schema()
export class Users {
  @Prop()
  username: string;
  @Prop({
    select: false,
  })
  password: string;
  @Prop()
  displayname: string;
  @Prop({
    select: false,
  })
  email: string;
  @Prop()
  avatar?: string;
  @Prop({
    default: ['user'],
  })
  role: [];
  @Prop({
    default: Date.now,
  })
  created_at: Date;
  @Prop({
    ref: 'Story',
  })
  followstory: string[];
  @Prop()
  rate: [];
  @Prop()
  wall?: string;
  @Prop({ default: 1 })
  status: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
