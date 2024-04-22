import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Put,Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseTeamFormDataJSONPipe } from './pipes/team.pipe';
import { MinioService } from 'src/minio/minio.service';

const   MEMBER_TEAM_LIMIT = 8;
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService, private readonly minioService: MinioService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({transform: true}))
  @UsePipes(new ParseTeamFormDataJSONPipe())
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@Body() body: CreateTeamDto, @UploadedFile() avatar: Express.Multer.File) {
      console.log("BODY: ", body)
      console.log("FILE: ", avatar)

      await this.minioService.createBucketIfNotExists();
      const filename = await this.minioService.uploadFile(avatar);


      return this.teamService.createTeam(body, filename);
  }


  @Get('findAll')
  findAll(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number){
    const _limit = limit ? limit : MEMBER_TEAM_LIMIT;
    return this.teamService.findAllTeam(_limit);
  }
  
  @Patch('update/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  @UsePipes(new ParseTeamFormDataJSONPipe())
  @UseInterceptors(FileInterceptor('avatar'))
  update(@Param('id', ParseIntPipe) id: number ,@Body() updateteamdto: Partial<UpdateTeamDto>, @UploadedFile() avatar: Expre) {
     console.log("THE ID: ", id)
     console.log("THE TYPE OF THE ID: ", typeof id)
    // return;



    //  return this.teamService.updateTeam(id, updateteamdto);
  }

  @Get('findById/:id')
  findOne( @Param('id', ParseIntPipe) id: number) {
    
    //  console.log("THE ID: ", id)
    return this.teamService.findByIdTeam(id);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.removeTeam(id);
  }




}

