import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "@prisma/client";



@Injectable({})
export class ReviewService{
    constructor(private prisma : PrismaService){}

    async createReview(body: CreateReviewDto){
        const response = await this.prisma.review.create({data : {
            comment : body.comment,
            rating : body.rating,
            published : body.published,
            user_id : 1,
            project_id : 1
            },
        });
        return response;
    }

    async readReviews(){
        const response = await this.prisma.review.findMany();
        return response;
    }

    async findOne(uid : number, pid:number){
        const response = await this.prisma.review.findUnique({where : {user_id_project_id : {user_id : uid, project_id : pid}}});
        return response;
    }

    async updateReview(uid : number, pid:number, updateReviewDto: Partial<Review>){
        const response = await this.prisma.review.update({where : {user_id_project_id : {user_id : uid, project_id : pid}}, data : updateReviewDto});
        return response;
    }

    async deleteReview(uid : number, pid:number){
        const response = await this.prisma.review.delete({where : {user_id_project_id : {user_id : uid, project_id : pid}}});
        return response;
    }
}