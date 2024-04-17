import { Category } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  excerpt: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  imagefile: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({value}) => Boolean(value))
  published: boolean;

  @IsNumber()
  @Transform(({value}) => Number(value))
  user_id: number;

  @Transform(({value}) => JSON.parse(value))
  categories: Category[];
}
