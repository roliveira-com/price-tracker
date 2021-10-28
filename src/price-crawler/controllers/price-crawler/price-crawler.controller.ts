import { Controller, Get, Post, Body, HttpException, HttpStatus, Render } from '@nestjs/common';
import { ISelectedStore } from '../../interface/store.interface';
import { PageParseService } from '../../services/page-parse/page-parse.service';
import { PageLoadService } from '../../services/page-load/page-load.service';
import { QuotationService } from 'src/price-crawler/services/quotation.service';

@Controller('crawler')
export class PriceCrawlerController {

  constructor(
    private readonly pageService: PageLoadService,
    private readonly parserService: PageParseService,
    private readonly quotationService: QuotationService,
  ){}

  @Get("page")
  async crawlerPage(): Promise<any> {
    try {
      // const page = await this.pageService.getPage()
      // return this.parserService.parsePage(page, {
      //   storeId: 'magalu',
      //   storeName: 'Kabum!',
      //   site: null,
      //   logo: null
      // })
      return this.quotationService.productQuotations();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  @Post('page')
  async parseParge(@Body() store: ISelectedStore){
    const page = await this.pageService.getPage()
    return this.parserService.parsePage(page, store)
  }

}
