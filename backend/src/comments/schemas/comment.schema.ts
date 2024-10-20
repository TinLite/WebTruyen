import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Users } from "src/users/schemas/users.schema";
@Schema()
export class Comment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: Users[];
    @Prop()
    content: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Story' })
    storyId: string;
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    likes: Users[];
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    replyTo:Comment;
    @Prop()
    hasReply?: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
