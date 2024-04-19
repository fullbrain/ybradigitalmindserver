// events.service.ts

import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService, private readonly minioService: MinioService) {}

  async findAll() {
    const fetchedEvents = await this.prisma.event.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true ,
          }
        }
      },
      orderBy: {
        createAt: "desc"
      }
    })

    const filteredEvents = await Promise.all(fetchedEvents.map(async (event) => {
      const imageURL = await this.minioService.getFileUrl(event.image);

      return {
        ...event,
        image: imageURL
      }

    }))

    return filteredEvents;
  }

  async findById(id: number) {
    try {
      const response = await this.prisma.event.findUnique({ where: { id } });

      response.image = await this.minioService.getFileUrl(response.image)


      return response;
    } catch (err) {
      console.log('ERROR WHILE FETCHING THE EVENT: ', err);
    }
  }

  async findBySlug(slug: string) {
    try{
      const response = await this.prisma.event.findUnique({where: {slug}});

      response.image = await this.minioService.getFileUrl(response.image)

      return response;
      
    } catch(err) {
      console.log('ERROR HILE FETCHING THE EVENT BY SLUG: ', err);
    }
  }

  async createEvent(@Body() body: CreateEventDto, filename: string) {
    try {
      const response = await this.prisma.event.create({
        data: {
          name: body.name,
          description: body.description,
          slug: body.slug,
          image: filename,
          location: body.location,
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

  async update(id: number, data: Partial<CreateEventDto>, filename?: string) {
    try {

      if( filename ){
        data.image = filename
      } else {
        delete data.image
      }

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
