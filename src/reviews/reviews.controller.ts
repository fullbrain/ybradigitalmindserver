import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ReviewService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "@prisma/client";



@Controller('review')
export class ReviewController{
    constructor(private reviewsService : ReviewService){}

    @Post('create')
    createReview(@Body() body:CreateReviewDto){
        return this.reviewsService.createReview(body);
    }

    @Get()
    readReviews(){
        return this.reviewsService.readReviews();
    };

    @Get(':uid_pid')
    findOne(@Param('uid', ParseIntPipe) uid,@Param('pid', ParseIntPipe) pid){
        return this.reviewsService.findOne(uid, pid);
    };

    @Patch(':uid_pid')
    updateReview(@Param('uid', ParseIntPipe) uid,@Param('pid', ParseIntPipe) pid, @Body() body: Review){
        return this.reviewsService.updateReview(uid, pid, body);
    };
        
    @Delete(':uid_pid')
    deleteReview(@Param('uid', ParseIntPipe) uid,@Param('pid', ParseIntPipe) pid){
        return this.reviewsService.deleteReview(uid, pid);
    };
}