import { Module } from '@nestjs/common';
import { MentorService } from './services/mentor.service';
import { MentorController } from './mentor.controller';
import { MentorRepository } from './repositories/mentor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MentorEntity } from 'src/database/entities/mentor.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([MentorRepository, MentorEntity])
  ],
  controllers: [MentorController],
  providers: [MentorService, MentorRepository],
  exports: [MentorRepository]
})
export class MentorModule {}
