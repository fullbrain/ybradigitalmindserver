import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';

export class MailDTO {
  @IsBoolean()
  agreement: boolean;

  @IsNotEmpty()
  @IsString()
  company: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fname: string;

  @IsNotEmpty()
  @IsString()
  lname: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

}
