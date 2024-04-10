import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";



export class AddNewsletter {

    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    fullname: string

    @IsString()
    @IsOptional()
    Priority: string
}