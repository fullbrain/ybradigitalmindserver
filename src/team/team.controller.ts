import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Put,Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';

const   MEMBER_TEAM_LIMIT=6;
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('create')
  create(@Body() createTeamDto: CreateTeamDto) {
  
      return this.teamService.createTeam(createTeamDto);
  }


  @Get('findAll')
  findAll(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number){
    const _limit = limit ? limit : MEMBER_TEAM_LIMIT;
    return this.teamService.findAllTeam(_limit);
  }
  
  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number ,@Body() updateteamdto: Partial<UpdateTeamDto>) {
    //  console.log("THE ID: ", id)
    //  console.log("THE TYPE OF THE ID: ", typeof id)
    // return;
     return this.teamService.updateTeam(id, updateteamdto);
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

