import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateReviewDto {
    createdAt: Date
    updatedAt: Date
    user_id: number
    project_id: number

    @IsBoolean()
    published: boolean

    @IsString()
    @IsNotEmpty()
    comment: string

    @IsNotEmpty()
    @IsNumber()
    rating: number
}

