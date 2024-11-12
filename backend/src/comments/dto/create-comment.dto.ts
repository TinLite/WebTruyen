import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    content: string;
    @IsOptional()
    replyTo?: string | null;
}
