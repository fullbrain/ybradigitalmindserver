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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

const PROJECTS_LIMIT = 8;

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body);
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

  @Patch('update/:id')
  updateProject(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.projectService.updateProject(id, body);
  }

  @Delete('delete/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }
}
