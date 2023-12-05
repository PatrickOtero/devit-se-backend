import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jtw/jwt.strategy';
import { MentorRepository } from '../mentors/repositories/mentor.repository';
import { MentorEntity } from 'src/database/entities/mentor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/database/entities/admin.entity';
import { AdminRepository } from '../admin/repositories/admin.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([MentorEntity, AdminEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MentorRepository, AdminRepository],
  exports: [AuthService]
})

export class AuthModule {}
