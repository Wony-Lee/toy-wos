import { Injectable } from '@nestjs/common';
import { CreateGatheringDto } from './dto/create-gathering.dto';
import { UpdateGatheringDto } from './dto/update-gathering.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gathering } from './entities/gathering.entity';
import { GatheringEntry } from './entities/gathering-entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GatheringsService {
  constructor(
    @InjectRepository(Gathering)
    private readonly gatheringRepository: Repository<Gathering>,
    @InjectRepository(GatheringEntry)
    private readonly gatheringEntryRepository: Repository<GatheringEntry>,
  ) {}

  createGatheringTryCatch(createGatheringDto: CreateGatheringDto) {
    const { title, region, content, charge, maxMember, minMember } =
      createGatheringDto;
    if (!title) {
      throw new Error('title is required');
    }
    if (!region) {
      throw new Error('region is required');
    }
    if (!content) {
      throw new Error('content is required');
    }
    if (!charge) {
      throw new Error('charge is required');
    }
    if (!maxMember) {
      throw new Error('maxMember is required');
    }
    if (!minMember) {
      throw new Error('minMember is required');
    }
    if (maxMember < minMember) {
      throw new Error('maxMember must be greater than minMember');
    }
    try {
    } catch (error) {
      console.log('error');
    }
  }

  create(createGatheringDto: CreateGatheringDto) {
    const { title, region, content, charge, maxMember, minMember } =
      createGatheringDto;

    this.createGatheringTryCatch(createGatheringDto);

    const gathering = this.gatheringRepository.create({
      title,
      region,
      content,
      charge,
      maxMember,
      minMember,
    });
    this.gatheringRepository.save(gathering);

    return {
      message: 'success',
      statusCode: 201,
    };
  }

  findAll() {
    return `This action returns all gatherings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gathering`;
  }

  update(id: number, updateGatheringDto: UpdateGatheringDto) {
    return `This action updates a #${id} gathering`;
  }

  remove(id: number) {
    return `This action removes a #${id} gathering`;
  }
}
