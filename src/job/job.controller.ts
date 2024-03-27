import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Put } from '@nestjs/common';
import {  JobService } from './job.service';
import { CreateJobDto } from './dto/create.job.dto';
import { UpdateJobDto } from './dto/update.job.dto';


@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('create')
  create(@Body() createjobdto: CreateJobDto) {

     return this.jobService.createJob(createjobdto);
  }

  @Get('findAll')
  findAll(){
    return this.jobService.findAllJob();
  }
  
  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number ,@Body() updatejobdto: UpdateJobDto) {
     return this.jobService.updateJob(id, updatejobdto);
  }

  

  @Get('findById/:id')
  findOne( @Param('id', ParseIntPipe) id: number) {
    
    //  console.log("THE ID: ", id)
    return this.jobService.findByIdJob(id);
  }

  @Delete('remove/:id')
  remove( @Param('id', ParseIntPipe)id: number) {
    return this.jobService.removeJob(id);
  }

  @Delete('removebyname/:name')
  removeByName( @Param('name') name: string) {
    return this.jobService.removeJobByName(name);
  }


  @Get('count/:name')
  getCountByJob(@Param('name') name: string) {
 
   return this.jobService.countByJob(name);
 
  }


}