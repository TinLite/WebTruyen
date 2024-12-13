import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateStoryDto {
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsString()
  genre: string;
  @IsOptional()
  authorId: Schema.Types.ObjectId;
  coverImage?: string;
}
