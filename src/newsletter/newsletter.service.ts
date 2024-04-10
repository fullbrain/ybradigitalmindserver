import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddNewsletter } from './dto';
import { $Enums } from '@prisma/client';

@Injectable()
export class NewsletterService {

    constructor(private prismaService: PrismaService){}


    async getAllEmails() {
        try{
            const response = await this.prismaService.newsletter.findMany();

            return response;
        }catch(err){
            console.log("ERROR WHILE FETCHING THE EMAILS: ", err)
        }
    }

    async addNewsletteremail(dto: AddNewsletter){

        const priorities = {
            "HIGH": $Enums.Priority.HIGH,
            "MEDIUM": $Enums.Priority.MEDIUM,
            "LOW": $Enums.Priority.LOW
        }


        try{
            const response = await this.prismaService.newsletter.create({
                data: {
                    email: dto.email,
                    fullname: dto.fullname,
                    priority: priorities[dto.Priority]
                }
            })

            return response;
        }catch(err){
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
