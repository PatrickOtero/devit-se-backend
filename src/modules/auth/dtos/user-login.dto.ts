import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: "The 'userName' field must not be empty" })
  @IsString({ message: 'Only strings are allowed in this field' })
  @ApiProperty({
    required: true,
    description: 'UserName do usuário.',
    example: 'FulanoDeTal123',
  })
  userName: string;

  @IsString({ message: 'Only strings are allowed in this field' })
  @IsNotEmpty({ message: "The 'password' field must not be empty" })
  @ApiProperty({
    required: true,
    description: 'Senha de Login',
    example: 'Abcd@123',
  })
  password: string;
}
