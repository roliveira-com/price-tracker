import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Redirect,
  Res,
  Req,
  UseFilters
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { PageFeedbackExceptionFilter } from '../../common/exception';
import { AuthCookieGuard } from '../guards/auth-cookie.guard';
import { AuthSessionGuard } from '../guards/auth-session.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor() { }

  @Get('login')
  @Redirect('/login', 301)
  getLogin() {}

  // @UseGuards(AuthSessionGuard)
  // @UseFilters(SessionDenialExceptionFilter)
  // @Post('login')
  // async logIn(@Req() request) {
  //   return { authenticated: request.isAuthenticated() }
  // }

  // @UseInterceptors(FileInterceptor('email'))
  // @UseGuards(AuthCookieGuard)
  // @Get('login')
  // async(@Body() body) {
  //   return body;
  // }
} 