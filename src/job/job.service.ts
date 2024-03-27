import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create.job.dto';
import { UpdateJobDto } from './dto/update.job.dto';




@Injectable({})
export class JobService {
  constructor(private prisma: PrismaService) {}
  

  async createJob(createJobDto: CreateJobDto){
 
    const create = await this.prisma.job.create({
     data:{
        name:createJobDto.name
     }
    });
    return create;
  }


  async removeJob(id:number){
  return this.prisma.job.delete({
    where: { id },
  });

  }

  async removeJobByName(name:string){
    const job = await this.prisma.job.findFirst({
      where: {
       name : name
      },
    });
    if (!job) {
      throw new Error('Job non trouvée.');
    }
    return this.prisma.job.delete({
      where: {
        id: job.id,
      },
    });
    }

  async findAllJob() {
    return this.prisma.job.findMany();
  }
    
 async updateJob(id: number, updateJobDto: UpdateJobDto) {

  return this.prisma.job.update({
    where: { id },
    data: {
      name:updateJobDto.name,
    }
  });
}
  

async findByIdJob(id: number) {
  return this.prisma.job.findUnique({
    where: { id }
  });
}

 
  async countByJob (name: string){
    const nbr = await this.prisma.job.count({
      where: { name: name }
    });
    const message = `Le nombre d'équipes ayant le statut ${name} est : ${nbr}`;
    return message;
  }

  

}
