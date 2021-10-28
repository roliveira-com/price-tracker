import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuotationService } from '../services/quotation.service';

@Controller('')
export class PagesController {

  constructor(
    private readonly quotationService: QuotationService
  ) {}

  @Get('home')
  async getHome(@Res() res: Response) {
    const quotations = await this.quotationService.list();
    return res.render(
      'pages/trackings',
      { 
        title: 'Preços',
        list: quotations, 
      }
    )
  }

}
