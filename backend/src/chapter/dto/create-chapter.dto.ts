import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateChapterDto {
  UserId: Schema.Types.ObjectId;
  @IsNotEmpty()
  StoryId: Schema.Types.ObjectId;
  @IsNotEmpty()
  Title: String;
  @IsNotEmpty()
  Content: String;
  @IsNotEmpty()
  ChapterNumber: string;
}
