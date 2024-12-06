import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateChapterDto {
  @IsOptional()
  Title: String;
  @IsOptional()
  Content: String;
  @IsOptional()
  ChapterNumber: string;
}
