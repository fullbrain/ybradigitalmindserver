// events.service.ts

import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true ,
          }
        }
      }
    })
  }

  async findById(id: number) {
    try {
      const response = await this.prisma.event.findUnique({ where: { id } });

      return response;
    } catch (err) {
      console.log('ERROR WHILE FETCHING THE EVENT: ', err);
    }
  }

  async findBySlug(slug: string) {
    try{
      const response = await this.prisma.event.findUnique({where: {slug}});

      return response;
      
    } catch(err) {
      console.log('ERROR HILE FETCHING THE EVENT BY SLUG: ', err);
    }
  }

  async createEvent(@Body() body: CreateEventDto) {
    try {
      const response = await this.prisma.event.create({
        data: {
          name: body.name,
          description: body.description,
          slug: body.slug,
          //image: body.image,
          location: body.location,
          image: body.image ? body.image : '',
          start_date: new Date(),
          end_date: new Date(),
          user: { connect: { id: body.user_id } },
        },
      });

      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException("Le Nom de l'événement existe déjà");
        }
      }
    }
  }

  async update(id: number, data: Partial<CreateEventDto>) {
    try {
      const response = await this.prisma.event.update({
        where: { id },
        data,
      });

      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException("Le Nom de l'événement existe déjà");
        }
      }
    }
  }

  async delete(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
