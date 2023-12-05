import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { MentorService } from './services/mentor.service';
import { CreateMentorDto } from './dto/create-mentors.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Mentor")
@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Post()
  async create(@Body() data: CreateMentorDto) {
    return this.mentorService.createMentor(data);
  }

  @Get()
  findAll() {
    return this.mentorService.findAllMentors();
  }

    @Get(":userName")
    async findOneMentor(@Param("userName") userName: string) {
      return this.mentorService.findOneByUserName(userName);
  }
}
