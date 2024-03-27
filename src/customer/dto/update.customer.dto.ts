import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  organisation?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  industry_sector: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsArray()
  project: number;
}
