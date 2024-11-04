import { IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateStoryDto {
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsString()
  genre: string;
  @IsNotEmpty()
  AuthorId: Schema.Types.ObjectId;
  CoverImage?: string[];
}
