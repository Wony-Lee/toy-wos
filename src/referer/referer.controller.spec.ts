import { Test, TestingModule } from '@nestjs/testing';
import { RefererController } from './referer.controller';
import { RefererService } from './referer.service';

describe('RefererController', () => {
  let controller: RefererController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefererController],
      providers: [RefererService],
    }).compile();

    controller = module.get<RefererController>(RefererController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
