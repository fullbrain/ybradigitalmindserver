import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto} from './dto/create-project.dto';
import { Project } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { MinioService } from 'src/minio/minio.service';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService, private minioService: MinioService) {}

  async createProject(body: CreateProjectDto, filename: string) {
    try {

      const response = await this.prisma.project.create({
        data: {
          name: body.name,
          description: body.description,
          slug: body.slug,
          client: body.client,
          image: [filename],
          published: body.published,
          user: { connect: { id: body.user_id } },
          customer: { connect: { id: body.customer_id } },
        },
      });

      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException(
            'Le titre du projet ne doit pas être identique à un autre titre déjà existant.',
          );
        } else {
          throw new Error("ERREUR: " + err.message);
        }
      } else if (err instanceof PrismaClientValidationError) {
        if (err.message.includes('Argument `image`: Invalid value provided.')) {
          throw new ForbiddenException(
            "Veuillez envoyer l'image dans un format de tableau.",
          );
        }
      } else {
        throw new Error('Erreur');
      }
    }
  }

  async readProject(limit: number) {
    const response = await this.prisma.project.findMany({
      take: limit,
    });

    const responseWithImage = Promise.all(response.map( async (project) => {
      const imageURL = await this.minioService.getFileUrl(project.image[0])

      return {
        ...project,
        image: [imageURL]
      }
    }))

    

    return responseWithImage;
  }

  async findOne(id: number) {
    const response = await this.prisma.project.findUnique({ where: { id } });

    response.image[0] = await this.minioService.getFileUrl(response.image[0]);

    return response;
  }

  async findOneBySlug( slug: string) {
    try{
      const response = await this.prisma.project.findUnique({where: {slug: slug}, include: {
        Review: {
          select: {
            user: true,
            comment: true,
            rating: true,
            user_id: true,
            project_id: true
          }
        }
      } });

      response.image[0] = await this.minioService.getFileUrl(response.image[0]);


      return response;
    } catch(err){
      console.log("ERROR WHILE FETCHING THE PROJECT BY SLUG: ", err)
    }
  }

  async updateProject(id: number, dto: CreateProjectDto, filename: string) {
    const slicedDto = _.omit(dto, ['user_id', "customer_id", "technologies"]);


    for( let key in dto){
      console.log(`This is the key ${key} and this is the type ${typeof dto[key]}`)
    }

    // TODO: Add multi image
    if( filename ) {
      dto.image = filename
    } else {
      delete dto.image;
    }


    // TODO: Add technologies
    // delete dto.technologies;

    const response = await this.prisma.project.update({
      where: { id: id },
      data: {...slicedDto, image: [filename], user: {
        connect: {
          id: dto.user_id
        }
      }, customer: {
        connect: {
          id: dto.customer_id
        }
      }},
    });
    return response;
  }

  async deleteProject(id: number) {
    const response = await this.prisma.project.delete({ where: { id } });
    return response;
  }
}
