import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { CompanyModule } from './modules/companies/company.module';
import { JobsDraftsModule } from './modules/jobs-drafts/jobs-drafts.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MentorModule } from './modules/mentors/mentor.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...typeormConfig,
        autoLoadEntities: true
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JobsModule, CompanyModule, JobsDraftsModule, AuthModule, MentorModule, AdminModule],
})
export class AppModule {}
