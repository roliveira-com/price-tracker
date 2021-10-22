import { Test, TestingModule } from '@nestjs/testing';
import { PageLoadService } from './page-load.service';

describe('PageLoadService', () => {
  let service: PageLoadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageLoadService],
    }).compile();

    service = module.get<PageLoadService>(PageLoadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
