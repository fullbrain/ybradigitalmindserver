import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsletterService {

    constructor(private prismaService: PrismaService){}

    async addNewsletteremail(email: string){
        try{
            const response = await this.prismaService.newsletter.create({
                data: {
                    email
                }
            })

            console.log("RESPONSE: ", response);

        }catch(err){

            console.log("ERROR WHILE ADDING NEWSLETTER: ", err)
            if( err instanceof PrismaClientKnownRequestError ){
                if( err.message.includes("Unique constraint failed on the fields") ){
                    throw new ConflictException("L'adresse e-mail que vous avez saisie est déjà abonnée à notre newsletter.")
                }
            } else {
                console.log("ERROR WHILE ADDING NEWSLETTER: ", err)
            }


        }
    }

}
