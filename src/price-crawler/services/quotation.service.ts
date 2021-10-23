import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuotation } from '../interface/quotation.interface';
import { Quotation, QuotationDocument } from '../schema/quotation.schema';
import { PageParseService } from './page-parse/page-parse.service';
import { ProductService } from './product.service';
import { TrackingService } from './tracking.service';

@Injectable()
export class QuotationService {
  private readonly logger = new Logger(QuotationService.name);

  constructor(
    @InjectModel(Quotation.name) private QuotationModel: Model<QuotationDocument>,
    private readonly productService: ProductService,
    private readonly parseService: PageParseService
  ) { }

  async create(createQuotation: IQuotation): Promise<Quotation> {
    const quotation = new this.QuotationModel(createQuotation);
    return quotation.save();
  }

  async list(): Promise<Quotation[]> {
    return this.QuotationModel.find()
          .populate('produto')
          .exec();
  }

  async productQuotations(): Promise<boolean> {
    const products = await this.productService.list();

    products.forEach(async product => {
      /**
       * Faz o crawling dos preços na página do produto
       */
      const quotation = await this.parseService.parseUrlToQuotation(product.url, product.loja);
      /**
       * Cria a cotação na base
       */
      return await this.create({ ...quotation, produto: product._id });
    })

    return new Promise((res, rej) => res(true))
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async triggerCronProductQuotations(): Promise<any>{
    return await this.productQuotations();
  }

}
