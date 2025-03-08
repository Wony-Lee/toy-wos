import { Test, TestingModule } from '@nestjs/testing';
import { GatheringsController } from './gatherings.controller';
import { GatheringsService } from './gatherings.service';

describe('GatheringsController', () => {
  let controller: GatheringsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatheringsController],
      providers: [GatheringsService],
    }).compile();

    controller = module.get<GatheringsController>(GatheringsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
