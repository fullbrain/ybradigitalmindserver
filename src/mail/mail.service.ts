import { Injectable, Body } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDTO } from './dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  sendMail(@Body() body: MailDTO) {
    try{
      const email = this.mailerService.sendMail({
        to: 'amarmedfilali@gmail.com',
        from: body.email,
        subject: `De la part de "${body.fname} ${body.lname}" de ${body.company} numero ${body.phone}`,
        text: body.message,
      });
      return { status: "success",message: "L'e-mail a été envoyé avec succès." };

    }catch(err){
      console.log("AN ERROR OCCURED WHILE SENDING the email: ", err)
      throw new Error(err);
    }
  }
}
