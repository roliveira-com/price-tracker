import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  @Render('pages/login')
  getIndex() {
    return this.appService.resolveEntryContent();
  }
}
