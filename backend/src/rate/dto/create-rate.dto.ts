import { IsNotEmpty } from 'class-validator';

export class CreateRateDto {
  @IsNotEmpty()
  Score: Number;
}
