import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { userInfo } from 'os';

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
  avatar: string;
  @Prop({
    default: 'user',
  })
  role: [];
  @Prop({
    default: Date.now,
  })
  created_at: Date;
  @Prop({
    default: '[]',
  })
  followstory: [];
  @Prop({
    default: '[]',
  })
  rate: [];
  @Prop()
  wall: string;
  @Prop({default: 1})
  status: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
