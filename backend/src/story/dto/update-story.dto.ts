import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStoryDto {
  @IsOptional()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  genre: string;
  @IsOptional()
  coverImage?: string[];
}
