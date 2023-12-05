import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from '../dto/create-mentors.dto';
import { MentorRepository } from '../repositories/mentor.repository';
import * as bcrypt from "bcrypt"
import { MentorEntity } from 'src/database/entities/mentor.entity';

@Injectable()
export class MentorService {
  constructor( private readonly mentorRepository: MentorRepository) {}

  async createMentor (data: CreateMentorDto) {
    const mentor = await this.mentorRepository.findOneMentorByUserName(data.userName)

    if (mentor) {
      return {status: 400, message: "Unavailable userName, please choose another"}
    }

    data.password = await bcrypt.hash(data.password, 10)
    
    await this.mentorRepository.createMentor(data)

    return { status: 201, message: "Mentor created successfully"}
  }

  findAllMentors() {
    return this.mentorRepository.getAllMentors()
  }

  async findOneByUserName(userName: string): Promise<{message:string, data?: MentorEntity}> {
    const mentor = await this.mentorRepository.findOneMentorByUserName(userName)

    if (!mentor) {
      return { message: "User does not exists"}
    }

    delete mentor.password

    return {message: "User Found", data: mentor}
  }
}
