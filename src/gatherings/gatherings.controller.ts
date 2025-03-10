import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GatheringsService } from './gatherings.service';
import { CreateGatheringDto } from './dto/create-gathering.dto';
import { UpdateGatheringDto } from './dto/update-gathering.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { GetUser } from '../decorators/get-user.decarator';

@Controller('gatherings')
export class GatheringsController {
  constructor(private readonly gatheringsService: GatheringsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() user: any, @Body() createGatheringDto: CreateGatheringDto) {
    console.log('user', user);
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
  update(
    @Param('id') id: string,
    @Body() updateGatheringDto: UpdateGatheringDto,
  ) {
    return this.gatheringsService.update(+id, updateGatheringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatheringsService.remove(+id);
  }
}
