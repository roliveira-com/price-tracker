import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { IProduct } from '../interface/product.interface';
import { ITrackingCreate } from '../interface/tracking.interface';
import { Product } from '../schema/product.schema';
import { PageParseService } from '../services/page-parse/page-parse.service';
import { ProductService } from '../services/product.service';
import { QuotationService } from '../services/quotation.service';
import { TrackingService } from '../services/tracking.service';

@Controller('api')
export class ApiController {

  constructor(
    private readonly productService: ProductService,
    private readonly trackingService: TrackingService,
    private readonly quotationService: QuotationService,
    private readonly parserService: PageParseService
  ){}

  @Get('product')
  async listProduct() {
    return this.productService.list();
  }

  @Post('product')
  async createProduct(@Body() product){
    return this.productService.create(product);
  }

  @Get('tracking')
  async listTracking() {
    return this.trackingService.list();
  }

  @Post('tracking')
  async createTracking(@Body() tracking: ITrackingCreate) {
    try {
      let produto = await this.productService.getProductByUrl(tracking.url);
      let user = '617073c8dc6be79833a7d812'; //ver depois de onde virá o user id

      if (!produto) {
        produto = await this.parserService.parseUrlToProduct(tracking.url, tracking.loja);
        produto = await this.productService.create(produto);
      }

      return this.trackingService.create({ ...tracking, produto: produto._id, user })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('quotation')
  async listQuotation() {
    return this.quotationService.list();
  }

  @Post('quotation')
  async createQuotation(@Body() quotation) {
    return this.quotationService.create(quotation);
  }

}
