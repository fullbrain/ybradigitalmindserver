import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';

@Injectable({})
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    try{
      const create = await this.prisma.team.create({
        data: {
          firstname: createTeamDto.firstname,
          lastname: createTeamDto.lastname,
          image: createTeamDto.image,
          bio: createTeamDto.bio,
          job: {
            connect: { id: createTeamDto.jobId },
          },
        },
      });
      return create;

    } catch(err){
      console.log("ERROR WHILE CREATING THE TEAM: ", err)
    }
  }
  async findByIdTeam(id: number) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        job: {
          select: {
            name: true,
          },
        },
      },
    });
  }


async findAllTeam(limit?:number) {
    return this.prisma.team.findMany({ 
    orderBy: {
      id: 'asc'
    },
    take: limit,
    include: {
        job : {
          select:{
            name:true,
          }
        }
    },
  });
 

}
  
  
 async updateTeam(id: number, dto: UpdateTeamDto) {

  const reponse = this.prisma.team.update({
    where: { id },
    data: {
      firstname:dto.firstname,
      lastname:dto.lastname,
      image:dto.image,
      bio:dto.bio,
      job: { connect: { id: dto.jobId } } 
    }
  });

  return reponse;
}
  



  async removeTeam(id:number){
    return this.prisma.team.delete({
      where:{id}
    });
  }

  async removeTeamBySlug(slug: string) {
    const match = slug.match(/^([^-]+)-(.+)$/);
    if (match) {
      const firstname = match[1];
      const lastname = match[2];
  
 
      const membre = await this.prisma.team.findFirst({
        where: {
          firstname: firstname,
          lastname: lastname,
        },
      });
      if (!membre) {
        throw new Error('Membre non trouvée.');
      }
      return this.prisma.team.delete({
        where: {
          id: membre.id,
        },
      });
 
    } else {
      console.log("ca marche pas")

    }
    

   

  }
  
}
