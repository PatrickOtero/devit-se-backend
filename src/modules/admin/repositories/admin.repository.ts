import { Repository } from "typeorm";
import { CreateAdminDto } from "../dto/create-admins.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/database/entities/admin.entity";

@Injectable()
export class AdminRepository {
    constructor(@InjectRepository(AdminEntity) private adminRepository: Repository<AdminEntity>) {}
    async createAdmin(data: CreateAdminDto) {
        return this.adminRepository.save(data)
    }

    async getAllAdmins() {
       return this.adminRepository.find()
    }

    async findOneAdminById(id: string): Promise<AdminEntity> {
      return this.adminRepository.findOne({where: { id }})
   }

    async findOneAdminByUserName(userName: string) {
        return this.adminRepository.findOne({ where: { userName: userName }, select: { userName: true}})
     }

     async updateAdmin(data: AdminEntity) {
        return this.adminRepository.save(data)
     }

     
}