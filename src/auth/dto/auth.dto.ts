import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';
// import { Job } from '';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Veuillez saisir une adresse email valide.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Le mot de passe doit contenir au moins 5 caractères.',
  })
  password: string;

  username?: string | null;
}

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, {
    message: 'Le mot de passe doit contenir au moins 5 caractères.',
  })
  password: string;
  confirmpassword: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;
}

export type userPayload = {
  sub: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
};
