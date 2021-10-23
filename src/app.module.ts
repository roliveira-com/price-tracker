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
    MongooseModule.forRoot(process.env.DATABASE_CONNECT)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
