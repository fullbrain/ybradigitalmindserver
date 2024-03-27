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
  jobId?: number;
}