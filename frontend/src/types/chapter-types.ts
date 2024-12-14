import { Story } from "./story-type";
import { User } from "./user-type";

export class Chapter {
  _id: string;
  UserId: User;
  StoryId: Story;
  Title: string;
  Content: string;
  ChapterNumber: number;
  CreateAt: Date;
  Status: boolean;
  constructor(
    _id: string,
    UserId: User,
    StoryId: Story,
    Title: string,
    Content: string,
    ChapterNumber: number,
    CreateAt: Date,
    Status: boolean
  ) {
    this._id = _id;
    this.UserId = UserId;
    this.StoryId = StoryId;
    this.Title = Title;
    this.Content = Content;
    this.ChapterNumber = ChapterNumber;
    this.CreateAt = CreateAt;
    this.Status = Status;
  }
}
