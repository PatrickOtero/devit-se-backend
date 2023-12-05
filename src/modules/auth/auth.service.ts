import {Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MentorRepository } from '../mentors/repositories/mentor.repository';
import { api } from 'src/lib/axios';
import { AdminRepository } from '../admin/repositories/admin.repository';
import { UserLoginDto } from './dtos/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private mentorRepository: MentorRepository,
    private adminRepository: AdminRepository,
    private jwt: JwtService,
  ) {}

  async execute({ userName, password}: UserLoginDto) {
    const user = await this.mentorRepository.findOneMentorByUserName(userName);

    const admin = await api.get(`/login/token.php?username=${userName}&password=${password}&service=moodle_mobile_app`)

    if (!user && admin.data.error) {
      return { status: 404, data: "The credentials passed are incorrect"}
    }

    if (user) {
    
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return { status: 400, data: "The credentials passed are incorrect"}
    }

  }

    if (!user && !admin.data.error) {
      const token = admin.data.token
      
      if (token.length) {
        const adminExists = await this.adminRepository.findOneAdminByUserName(userName)

        if (!adminExists) {
          await this.adminRepository.createAdmin({userName, password})
        }

        // const getAdminInfo = await api.get(`webservice/rest/server.php?wstoken=${token}&wsfunction=core_user_get_users_by_field&field=username&values[0]=user&moodlewsrestformat=json`)

      return {
        status: 200,
        message: "Admin Logged successfully",
        data: {
          token: this.jwt.sign({ userName }),
          adminExists,
        },
      };
    }
    }

    return {
      status: 200,
      message: "Logged successfully",
      data: {
        token: this.jwt.sign({ userName }),
        user,
      },
    };
  }
}
