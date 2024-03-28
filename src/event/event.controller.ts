// events.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  async post(@Body() body: CreateEventDto) {
    return this.eventsService.createEvent(body);
  }
  

  @Get('getall')
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get('getone/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findById(id);
  }

  @Get('getonebyslug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug)
  }

  @Patch('update/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateEventDto>,
  ) {
    return this.eventsService.update(id, dto);
  }

  @Delete('deleteone/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.delete(id);
  }
}
