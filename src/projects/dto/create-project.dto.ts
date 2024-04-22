import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  createdAt: Date;
  updatedAt: Date;


  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  slug: string;
  
  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsString()
  client: string;
  
  image: string;
  imagefile: string;
  
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({value}) => Boolean(value))
  published: boolean;
  
  @IsString()
  technologies: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => Number(value))
  user_id: number;
  
  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => Number(value))
  customer_id: number;
}

export class UpdateProjectDto {
  createdAt: Date;
  updatedAt: Date;


  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  slug: string;
  
  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsString()
  client: string;
  
  image: string;
  imagefile: string;
  
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({value}) => Boolean(value))
  published: boolean;
  
  @IsString()
  technologies: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => Number(value))
  user_id: never;
  
  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => Number(value))
  customer_id: never;
}
