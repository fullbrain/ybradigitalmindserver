import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';
import { MinioService } from 'src/minio/minio.service';
import { Team } from '@prisma/client';

@Injectable({})
export class TeamService {
  constructor(private prisma: PrismaService, private readonly minioService: MinioService) {}

  async createTeam(createTeamDto: CreateTeamDto, filename: string) {
    try{
      const create = await this.prisma.team.create({
        data: {
          firstname: createTeamDto.firstname,
          lastname: createTeamDto.lastname,
          image: filename,
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

    const response = await this.prisma.team.findUnique({
      where: { id },
      include: {
        job: {
          select: {
            name: true,
          },
        },
      },
    });

    response.image = await this.minioService.getFileUrl(response.image);

    return response;
  }


async findAllTeam(limit?:number) {

  const members = await this.prisma.team.findMany({ 
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

  const fetchedMembers = await Promise.all(members.map(async (member) => {
    const imageURL = await this.minioService.getFileUrl(member.image)
    return {
      ...member,
      image: imageURL
    }
  }))


  return fetchedMembers;
 

}
  
  
 async updateTeam(id: number, dto: UpdateTeamDto, filename: string) {

  const reponse = this.prisma.team.update({
    where: { id },
    data: {
      firstname:dto.firstname,
      lastname:dto.lastname,
      image:filename,
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
