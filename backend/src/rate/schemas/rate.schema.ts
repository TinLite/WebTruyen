import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';

@Schema()
export class Rate {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  UserId: Users;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  })
  StoryId: 'Story';
  @Prop()
  Content: string;
  @Prop({
    default: Date.now,
  })
  Date: Date;
  @Prop({
    default: true,
  })
  status: boolean;
}
export const RateSchema = SchemaFactory.createForClass(Rate);
