import { Controller, Body, Post, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDTO } from './dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  sendMail(@Body() body: MailDTO) {
    return this.mailService.sendMail(body);
  }

}
