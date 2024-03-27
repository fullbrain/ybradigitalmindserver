import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  image: string[];

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @IsString()
  technologies: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  customer_id: number;
}
