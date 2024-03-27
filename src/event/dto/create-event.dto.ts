import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  createAt: Date;

  updatedAt: Date;

  start_date: Date;

  end_date: Date;

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
  location: string;

  @IsString()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
