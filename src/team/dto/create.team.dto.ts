import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsNumber()
  jobId: number;
}
