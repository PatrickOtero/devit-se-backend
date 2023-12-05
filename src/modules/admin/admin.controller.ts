import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './services/admin.service';
import { CreateAdminDto } from './dto/create-admins.dto';

@ApiTags("Admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() data: CreateAdminDto) {
    return this.adminService.createAdmin(data);
  }

  @Get()
  findAll() {
    return this.adminService.findAllAdmins();
  }

    @Get(":userName")
    async findOneMentor(@Param("userName") userName: string) {
      return this.adminService.findOneByUserName(userName);
  }
}
