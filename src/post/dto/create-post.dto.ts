import { Category } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  user_id: number;

  categories: Category[];
}
