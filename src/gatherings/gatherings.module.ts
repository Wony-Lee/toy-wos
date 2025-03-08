import { Module } from '@nestjs/common';
import { GatheringsService } from './gatherings.service';
import { GatheringsController } from './gatherings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gathering } from './entities/gathering.entity';
import { GatheringEntry } from './entities/gathering-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gathering, GatheringEntry])],
  controllers: [GatheringsController],
  providers: [GatheringsService],
})
export class GatheringsModule {}
