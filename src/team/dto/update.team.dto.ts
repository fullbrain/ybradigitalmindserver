import { Transform } from 'class-transformer';
import {  IsOptional, IsString, IsNumber } from 'class-validator';


export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

    
  @IsOptional()
  @IsString()
  image?: string;


 
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number(value))
  jobId?: number;
}