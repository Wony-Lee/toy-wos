import { Test, TestingModule } from '@nestjs/testing';
import { RefererService } from './referer.service';

describe('RefererService', () => {
  let service: RefererService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefererService],
    }).compile();

    service = module.get<RefererService>(RefererService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
