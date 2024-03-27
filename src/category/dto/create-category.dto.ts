import { Post_Category } from '@prisma/client';
import { IsNotEmpty, IsString} from 'class-validator';

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    slug :string;
  
    posts?: Post_Category[];
  
  
}
