import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  organisation: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  industry_sector: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  customerIds?: number[];
}
