import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { CategorysService } from './category.service';
  import { CreateCategoryDto } from './dto/create-category.dto';

  
  @Controller('category')
  export class CategorysController {
    constructor(private readonly categorysService: CategorysService) {}


    @Post('create')
    async post(@Body() body :CreateCategoryDto){
        return this.categorysService.createCategory(body);
    }


    @Get('getall')
    async findAll(){
        return this.categorysService.findAll();
    }


    @Get("getallcount")
    async findAllCount(){
      return this.categorysService.findAllCount();
    }



    @Get('getone/:id')
    async findById(@Param('id',ParseIntPipe) id: number)
    {
      return this.categorysService.findById(id);
    }

    @Delete('deleteone/:id')
    async delete(@Param('id',ParseIntPipe) id: number){
        return this.categorysService.delete(id);
    }


    @Patch('update/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Partial<CreateCategoryDto>,
      ) {
        return this.categorysService.updatecategory(id, body);
      }

}