import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseProjectFormDataJSONPipe } from './pipes/createProject.pipe';
import { MinioService } from 'src/minio/minio.service';

const PROJECTS_LIMIT = 8;

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService, private readonly minioService: MinioService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({transform: true}))
  @UsePipes(new ParseProjectFormDataJSONPipe())
  @UseInterceptors(FileInterceptor('imagefile'))
  async createProject(@Body() body: CreateProjectDto, @UploadedFile() file: Express.Multer.File ) {
    await this.minioService.createBucketIfNotExists();
    const filename = await this.minioService.uploadFile(file);

    return this.projectService.createProject(body, filename);
  }

  @Get('getall')
  readProject(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const _limit = limit ? limit : PROJECTS_LIMIT;
    return this.projectService.readProject(_limit);
  }

  @Get('get/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Get('getbyslug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.projectService.findOneBySlug(slug);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  @UsePipes(new ParseProjectFormDataJSONPipe())
  @UseInterceptors(FileInterceptor('imagefile'))
  async updateProject(@Param('id') id: number, @Body() body: CreateProjectDto, @UploadedFile() imagefile: Express.Multer.File) {

    // for( let key in body){
    //   console.log(`This is the key ${key} and this is the type ${typeof body[key]}`)
    // }
    await this.minioService.createBucketIfNotExists();
    const filename = await this.minioService.uploadFile(imagefile);

    return this.projectService.updateProject(id, body, filename);
  }

  @Delete('delete/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }
}
