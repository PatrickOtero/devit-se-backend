import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoggedEntity } from './decorator/loggedEntity.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyEntity } from 'src/database/entities/company.entity';
import { UserLoginDto } from './dtos/user-login.dto';
import { MentorEntity } from 'src/database/entities/mentor.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  // @SwaggerLogin()
  async login(@Body() loginData: UserLoginDto, @Res() res: Response) {
    const { status, data } = await this.authService.execute(loginData);

    return res.status(status).send(data);
  }

  @Get('/user-logged')
  // @SwaggerLogged()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async userLogged(@LoggedEntity() user: MentorEntity) {
    return user;
  }
}
