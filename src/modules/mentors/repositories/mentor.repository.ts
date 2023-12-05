import { Repository } from "typeorm";
import { CreateMentorDto } from "../dto/create-mentors.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MentorEntity } from "src/database/entities/mentor.entity";

@Injectable()
export class MentorRepository {
    constructor(@InjectRepository(MentorEntity) private mentorRepository: Repository<MentorEntity>) {}
    async createMentor(data: CreateMentorDto) {
        return this.mentorRepository.save(data)
    }

    async getAllMentors() {
       return this.mentorRepository.find()
    }

    async findOneMentorById(id: string): Promise<MentorEntity> {
      return this.mentorRepository.findOne({where: { id }})
   }

    async findOneMentorByUserName(userName: string) {
        return this.mentorRepository.findOne({ where: { userName: userName }})
     }

     async updateMentor(data: MentorEntity) {
        return this.mentorRepository.save(data)
     }

     
}