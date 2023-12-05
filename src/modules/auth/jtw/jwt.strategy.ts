import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MentorRepository } from 'src/modules/mentors/repositories/mentor.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly mentorRepository: MentorRepository,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userName: string }) {
    const mentor = await this.mentorRepository.findOneMentorByUserName(payload.userName);

    if (!mentor) {
      throw new UnauthorizedException('Mentor not found or not authorized!');
    }
    
    if (mentor) {
    delete mentor.password;
    return mentor;
    }
  }
}
