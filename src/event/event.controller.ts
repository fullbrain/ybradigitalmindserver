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
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ParseEventFormDataJSONPipe } from './pipes/eventValidation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio/minio.service';

@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService, private readonly minionService: MinioService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({transform: true}))
  @UsePipes(new ParseEventFormDataJSONPipe())
  @UseInterceptors(FileInterceptor('imagefile'))
  async createEvent(@Body() body: CreateEventDto, @UploadedFile() imagefile: Express.Multer.File) {
    await this.minionService.createBucketIfNotExists();
    const filename = await this.minionService.uploadFile(imagefile)
    
    return this.eventsService.createEvent(body, filename);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  @UsePipes(new ParseEventFormDataJSONPipe())
  @UseInterceptors(FileInterceptor('imagefile'))
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateEventDto>,
    @UploadedFile() imagefile: Express.Multer.File
  ) {
    await this.minionService.createBucketIfNotExists();
    const filename = await this.minionService.uploadFile(imagefile);


    return this.eventsService.update(id, dto, filename);
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

  @Delete('deleteone/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.delete(id);
  }
}
