import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { CreatePostDto } from "../dto";


@Injectable()
export class PostValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        console.log("THE VALUE: ", value);
        console.log("THE METATYPE: ", metatype)


        return value;
    }
}