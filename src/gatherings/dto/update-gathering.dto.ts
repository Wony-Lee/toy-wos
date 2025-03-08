import { PartialType } from '@nestjs/swagger';
import { CreateGatheringDto } from './create-gathering.dto';

export class UpdateGatheringDto extends PartialType(CreateGatheringDto) {}
