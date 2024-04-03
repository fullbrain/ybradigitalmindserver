import { IsEmail } from "class-validator";


export class AddNewsletter {

    @IsEmail()
    email: string
    
}