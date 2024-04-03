import { Body, Controller, Post } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { AddNewsletter } from './dto';

@Controller('newsletter')
export class NewsletterController {

    constructor(private newsletterService: NewsletterService){}


    @Post("/add")
    addNewsletterEmail(@Body() payload: AddNewsletter){
        return this.newsletterService.addNewsletteremail(payload.email)
    }

}
