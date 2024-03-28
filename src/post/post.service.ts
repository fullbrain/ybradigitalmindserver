import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto';
import { Category, Post } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class PostService {
  constructor(private prisma: PrismaService) {}
  async createPost(dto: CreatePostDto) {
    try {
      const multipleQueries = this.generateQuery(dto.categories);

      const response = await this.prisma.post.create({
        data: {
          title: dto.title,
          slug: dto.slug,
          excerpt: dto.excerpt,
          text: dto.text,
          image: dto.image,
          published: dto.published,
          user: { connect: { id: dto.user_id } },
          categoriesOnPost: {
            create: multipleQueries,
          },
        },
      });

      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException(
            'Un article avec le même titre existe déjà. Veuillez choisir un titre unique pour votre publication.',
          );
        }
      }
    }
  }

  async getPostsInCategory(categoryId: number) {
    return this.prisma.post.findMany({
      where: {
        categoriesOnPost: {
          some: {
            category_id: categoryId,
          },
        },
      },
    });
  }

  async getPosts(limit?: number) {
    const response = this.prisma.post.findMany({
      take: limit ? limit : 8,
      
      include: {
        categoriesOnPost: {
          select: {
            categories: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        },
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    return response;
  }

  async findOne(id: number) {
    const response = this.prisma.post.findUnique({
      where: { id },
      include: {
        categoriesOnPost: {
          select: {
            categories: true
          }
        },
        user: true,
      },
    });

    return response;
  }

  async findOneBySlug(slug: string){
    try{
      const response = await this.prisma.post.findUnique({
        where: {
          slug: slug
        },
        include: {
          categoriesOnPost: {
            select: {
              categories: true
            }
          },
          user: true,
        },
      })

      return response;
    }catch(err){
      console.log("Error while loading the post by slug: ", err)
    }
  }

  

  async updatePost(id: number, updatePostDto: Partial<CreatePostDto>) {    

    try{
      const categories = updatePostDto.categories ? updatePostDto.categories.map(cat => ({category_id: cat.id})) : [] ;
      console.log("UPDATE POST DTO: ", categories);
  
      delete updatePostDto.categories;
  
      const response = await this.prisma.post.update({
        where: {id: id},
        data: {...updatePostDto, categoriesOnPost: {
          deleteMany: {},
          createMany: {
            data: categories
          }
        }}
      })
  
      return {status: "success", post: response};
    } catch(err){
      console.log("ERROR WHILE UPDATING THE POST: ", err)
    }

  }


  async findPostsByCategoryName(categoryslug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categoryslug },
      select: { id: true },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with name '${categoryslug}' not found.`,
      );
    }

    const response = await this.prisma.post.findMany({
      where: {
        categoriesOnPost: {
          some: {
            category_id: category.id,
          },
        },
      },
    });
    return response;
  }
  async findPostByName(categoryName: string) {
    const getPosts = await this.prisma.post.findMany({
      where: {
        categoriesOnPost: {
          some: {
            categories: {
              name: categoryName,
            },
          },
        },
      },
    });
    return getPosts;
  }

  generateUpdateQuery(categories: Category[]) {
    const multipleQueries = categories
      ? categories.map((category) => ({
          categories: {
            connectOrCreate: {
              where: { id: category.id },
              create: {
                name: category.name,
                slug: category.slug,
              },
            },
          },
        }))
      : [];
    return multipleQueries;
  }


  generateQuery(categories: Category[]) {
    const multipleQueries = categories
      ? categories.map((category) => ({
          categories: {
            connectOrCreate: {
              where: { slug: category.slug },
              create: {
                name: category.name,
                slug: category.slug,
              },
            },
          },
        }))
      : [];
    return multipleQueries;
  }

  async deletesupp(id:number) {
    const response =this.prisma.post.delete({where:{id}})
    return response 
  }
  async deletePost(id: number) {


    const response = this.prisma.post.delete({
      where: {
        id,
      },
    })
    return response;
    
}
}