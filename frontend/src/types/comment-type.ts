import { Story } from "@/types/story-type";
import { User } from "@/types/user-type";
import { Chapter } from "./chapter-types";

export class comment {
  _id: string;
  author: User;
  content: string;
  storyId: Story;
  chapterId: Chapter;
  created_at: Date;
  updated_at: Date;
  likes: string[];
  replyTo?: comment;
  hasReply?: boolean;
  constructor(
    _id: string,
    author: User,
    content: string,
    storyId: Story,
    chapterId: Chapter,
    created_at: Date,
    updated_at: Date,
    likes: string[],
    replyTo?: comment,
    hasReply?: boolean
  ) {
    this._id = _id;
    this.author = author;
    this.content = content;
    this.storyId = storyId;
    this.chapterId = chapterId;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.likes = likes;
    this.replyTo = replyTo;
    this.hasReply = hasReply;
  }
}
