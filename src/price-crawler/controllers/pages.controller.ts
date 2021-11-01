import { Controller, Get, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { QuotationService } from '../services/quotation.service';

@Controller('')
export class PagesController {

  constructor(
    private readonly quotationService: QuotationService
  ) {}

  @Get('home')
  async getHome(@Res() res: Response, @Session() session) {
    const quotations = await this.quotationService.list();
    return res.render(
      'pages/trackings',
      { 
        title: 'Preços',
        list: quotations, 
        user: session.passport.user
      }
    )
  }

}
