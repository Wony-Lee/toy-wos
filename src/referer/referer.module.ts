import { Module } from '@nestjs/common';
import { RefererService } from './referer.service';
import { RefererController } from './referer.controller';

@Module({
  controllers: [RefererController],
  providers: [RefererService]
})
export class RefererModule {}
