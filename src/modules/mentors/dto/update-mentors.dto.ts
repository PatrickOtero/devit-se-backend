import { PartialType } from '@nestjs/mapped-types';
import { CreateMentorDto } from './create-mentors.dto';

export class UpdateMentorDto extends PartialType(CreateMentorDto) {}
