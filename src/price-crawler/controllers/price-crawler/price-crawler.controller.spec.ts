import { Test, TestingModule } from '@nestjs/testing';
import { PriceCrawlerController } from './price-crawler.controller';

describe('PriceCrawler Controller', () => {
  let controller: PriceCrawlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceCrawlerController],
    }).compile();

    controller = module.get<PriceCrawlerController>(PriceCrawlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
