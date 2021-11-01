import { Body, Controller, Get, Post, Render, Req, Res, Session, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PageFeedbackExceptionFilter } from '../../common/exception';
import { AuthSessionGuard } from '../guards/auth-session.guard';
import { LoginUserDto } from '../validation/auth.dto';

@Controller('')
export class LoginController {

  @UseGuards(AuthSessionGuard)
  @UseFilters(PageFeedbackExceptionFilter)
  @Post('login')
  async logIn(@Res() res: Response, @Body() body) {
    res.redirect('/home')
  }

  @Get('login')
  @Render('pages/login')
  getLogin(@Body() body, @Session() sess) {
    return { 
      title: 'Login - Price Crawler', 
      //csrfToken: req.csrfToken(),
      error: false 
    };
  }

}
