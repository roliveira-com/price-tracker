import { Controller, Get, Render, Redirect } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  @Redirect('/login', 301)
  getIndex() {}

  // @Get('login')
  // @Render('pages/login')
  // getLogin() {
  //   return this.appService.resolveEntryContent();
  // }
}
