import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsOptional()
    displayname: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
