
import { IsOptional } from 'class-validator';

export class UpdateCommentDto{
    @IsOptional()
    content: string;
}
