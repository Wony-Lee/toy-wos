import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefererService } from './referer.service';
import { CreateRefererDto } from './dto/create-referer.dto';
import { UpdateRefererDto } from './dto/update-referer.dto';

@Controller('referer')
export class RefererController {
  constructor(private readonly refererService: RefererService) {}

  @Post()
  create(@Body() createRefererDto: CreateRefererDto) {
    return this.refererService.create(createRefererDto);
  }

  @Get()
  findAll() {
    return this.refererService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refererService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefererDto: UpdateRefererDto) {
    return this.refererService.update(+id, updateRefererDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refererService.remove(+id);
  }
}
