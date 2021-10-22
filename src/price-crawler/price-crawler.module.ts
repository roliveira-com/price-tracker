import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { PriceCrawlerController } from './controllers/price-crawler/price-crawler.controller';
import { Product, ProductSchema } from "./schema/product.schema";
import { Quotation, QuotationSchema } from "./schema/quotation.schema";
import { Tracking, TrackingSchema } from "./schema/tracking.schema";
import { User, UserSchema } from "./schema/user.schema";
import { PageLoadService } from './services/page-load/page-load.service';
import { PageParseService } from './services/page-parse/page-parse.service';
import { UserService } from './services/user.service';
import { ApiController } from './controllers/api.controller';
import { ProductService } from './services/product.service';
import { TrackingService } from './services/tracking.service';
import { QuotationService } from './services/quotation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Quotation.name, schema: QuotationSchema },
      { name: Tracking.name, schema: TrackingSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [PageLoadService, PageParseService, UserService, ProductService, TrackingService, QuotationService],
  controllers: [PriceCrawlerController, ApiController]
})
export class PriceCrawlerModule { }