import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';
import * as bcrypt from "bcrypt"
import { CreateAdminDto } from '../dto/create-admins.dto';
import { AdminEntity } from 'src/database/entities/admin.entity';

@Injectable()
export class AdminService {
  constructor( private readonly adminRepository: AdminRepository) {}

  async createAdmin (data: CreateAdminDto) {
    const admin = await this.adminRepository.findOneAdminByUserName(data.userName)

    if (admin) {
      return {status: 400, message: "Unavailable userName, please choose another"}
    }

    data.password = await bcrypt.hash(data.password, 10)
    
    await this.adminRepository.createAdmin(data)

    return { status: 201, message: "Admin created successfully"}
  }

  findAllAdmins() {
    return this.adminRepository.getAllAdmins()
  }

  async findOneByUserName(userName: string): Promise<{message:string, data?: AdminEntity}> {
    const admin = await this.adminRepository.findOneAdminByUserName(userName)

    if (!admin) {
      return { message: "Admin does not exists"}
    }

    delete admin.password

    return {message: "Admin Found", data: admin}
  }
}
