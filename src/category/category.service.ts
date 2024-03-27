import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Category } from '@prisma/client';

@Injectable()
export class CategorysService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({});
  }

  async findAllCount() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: [
        {
          updatedAt: "desc"
        }
      ]
    });
  }


  async findById(id:number) {
    try{
      const response =await this.prisma.category.findUnique({where:{id}});
      return response;
    }catch(err){
      console.log('ERROR WHILE FETCHING THE CATEGORY: ', err);
    }
  }

  async createCategory(@Body () body: CreateCategoryDto){
    try {
        const response = await this.prisma.category.create({
          data: {
            name: body.name,
            slug: body.slug,
            },
          },
        );
  
        return response;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            throw new ForbiddenException("Le Nom de la catégorie existe déjà");
          }
        }
      }
    }

    
  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  async updatecategory(id :number,updateCategoryDto:Partial<Category>){
    const response =this.prisma.category.update({
      where:{id},
      data:updateCategoryDto,
    })
    return response;
  }


  
}
