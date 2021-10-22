import { Test, TestingModule } from '@nestjs/testing';
import { PageParseService } from './page-parse.service';

describe('PageParseService', () => {
  let service: PageParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageParseService],
    }).compile();

    service = module.get<PageParseService>(PageParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
