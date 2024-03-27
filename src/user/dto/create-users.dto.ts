import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  hash: string;
}
