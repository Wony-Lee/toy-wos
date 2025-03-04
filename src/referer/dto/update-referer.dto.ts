import { PartialType } from '@nestjs/swagger';
import { CreateRefererDto } from './create-referer.dto';

export class UpdateRefererDto extends PartialType(CreateRefererDto) {}
