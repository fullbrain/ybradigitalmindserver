
import {  IsArray, IsInt, IsNotEmpty, IsOptional, IsString,  } from 'class-validator';




export class CreateJobDto {

  @IsNotEmpty()
  @IsString()
  name: string;


  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  teamIds?: number[];

}