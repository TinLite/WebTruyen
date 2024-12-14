import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateRateDto {
  @IsNotEmpty()
  @IsNumberString()
  Score: number;
}
