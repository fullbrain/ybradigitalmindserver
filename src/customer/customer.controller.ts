import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { Project } from '@prisma/client';

const CUSTOMER_LIMIT = 4;

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

  @Get('findall')
  findAll(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    const _limit = limit ? limit : CUSTOMER_LIMIT;
    return this.customerService.findAllCustomer(_limit);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: Project['id'],
    @Body() updateCustomerdto: Partial<CreateCustomerDto>,
  ) {
    return this.customerService.updateCustomer(id, updateCustomerdto);
  }

  @Get('findbyid/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findByIdCustomer(id);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
