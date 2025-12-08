import {
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PayerDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  documentType: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  cellPhone: string;
}

class OrderItemDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  quoteId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;

  @IsString()
  referenceId: string;

  @IsString()
  description: string;

  @IsString()
  redirectUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  totalAmount: number;

  @IsString()
  currency: string;
}
