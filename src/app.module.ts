import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceCrawlerModule } from './price-crawler/price-crawler.module';

@Module({
  imports: [
    PriceCrawlerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}/pricetracker`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
