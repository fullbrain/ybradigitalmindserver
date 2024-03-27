import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get('getall')
  getAllCategories() {
    return this.service.getCategories();
  }
}
