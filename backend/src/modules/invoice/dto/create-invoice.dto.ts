import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  date: string;

  @IsString()
  vendor_name: string;

  @IsString()
  description: string;

  @IsString()
  due_date: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsBoolean()
  paid: boolean;
} 