import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GatheringsService } from './gatherings.service';
import { CreateGatheringDto } from './dto/create-gathering.dto';
import { UpdateGatheringDto } from './dto/update-gathering.dto';

@Controller('gatherings')
export class GatheringsController {
  constructor(private readonly gatheringsService: GatheringsService) {}

  @Post()
  create(@Body() createGatheringDto: CreateGatheringDto) {
    return this.gatheringsService.create(createGatheringDto);
  }

  @Get()
  findAll() {
    return this.gatheringsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatheringsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGatheringDto: UpdateGatheringDto) {
    return this.gatheringsService.update(+id, updateGatheringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatheringsService.remove(+id);
  }
}
