import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { AddNewsletter } from './dto';

@Controller('newsletter')
export class NewsletterController {

    constructor(private newsletterService: NewsletterService){}

    @Get("/getall")
    getAllEmails(){
        return this.newsletterService.getAllEmails();
    }

    @Post("/add")
    addNewsletterEmail(@Body() dto: AddNewsletter){
        return this.newsletterService.addNewsletteremail(dto)
    }

}
