import { story } from "./story-type";
import { User } from "./user-type";

export class chapter {
  _id: string;
  UserId: User;
  StoryId: story;
  Title: string;
  Content: string;
  ChapterNumber: number;
  CreateAt: Date;
  Status: boolean;
  constructor(
    _id: string,
    UserId: User,
    StoryId: story,
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
