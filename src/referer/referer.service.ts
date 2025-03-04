import { Injectable } from '@nestjs/common';
import { CreateRefererDto } from './dto/create-referer.dto';
import { UpdateRefererDto } from './dto/update-referer.dto';

@Injectable()
export class RefererService {
  create(createRefererDto: CreateRefererDto) {
    return 'This action adds a new referer';
  }

  findAll() {
    return `This action returns all referer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referer`;
  }

  update(id: number, updateRefererDto: UpdateRefererDto) {
    return `This action updates a #${id} referer`;
  }

  remove(id: number) {
    return `This action removes a #${id} referer`;
  }
}
