import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MentorRepository } from '../mentors/repositories/mentor.repository';
import { MentorEntity } from 'src/database/entities/mentor.entity';
import { MentorController } from '../mentors/mentor.controller';
import { MentorService } from '../mentors/services/mentor.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([MentorRepository, MentorEntity])
  ],
  controllers: [MentorController],
  providers: [MentorService, MentorRepository],
  exports: [MentorRepository]
})
export class AdminModule {}
