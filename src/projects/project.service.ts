import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(body: CreateProjectDto) {
    try {
      const response = await this.prisma.project.create({
        data: {
          name: body.name,
          description: body.description,
          slug: body.slug,
          client: body.client,
          image: body.image,
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
    return response;
  }

  async findOne(id: number) {
    const response = await this.prisma.project.findUnique({ where: { id } });
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
      return response;
    } catch(err){
      console.log("ERROR WHILE FETCHING THE PROJECT BY SLUG: ", err)
    }
  }

  async updateProject(id: number, updateProjectDto: Partial<Project>) {
    const response = await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
    return response;
  }

  async deleteProject(id: number) {
    const response = await this.prisma.project.delete({ where: { id } });
    return response;
  }
}
