import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsAlphanumeric, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsAlphanumeric()
  username: string;

  @IsOptional()
  displayName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  wall: string;
}
