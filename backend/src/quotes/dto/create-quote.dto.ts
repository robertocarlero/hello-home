import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  Length,
} from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  orderTotal: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  initialCurrency: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  finalCurrency: string;
}
