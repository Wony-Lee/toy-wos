import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CHARGE_STATUS } from '../entities/gathering.entity';

export class CreateGatheringDto {
  @IsString()
  title: string;

  @IsString()
  region: string;

  @IsString()
  content: string;

  @IsNumber()
  charge: number;

  @IsEnum(CHARGE_STATUS, {
    message: 'chargeStatus must be either FREE or PAID',
  })
  chargeStatus: CHARGE_STATUS;

  @IsNumber()
  maxMember: number;

  @IsNumber()
  minMember: number;

  @IsString() // 직렬화 해서 처리할건지
  images: string;
}
