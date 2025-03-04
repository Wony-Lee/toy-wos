import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum GENDER_TYPE {
  NONE = 0,
  MALE = 1,
  FEMALE = 2,
}

export class CreateAuthDto {
  @ApiProperty({
    example: 'sample@sample.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password1234',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '홍길동',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '01012345678',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'gender 1 or 2',
  })
  @IsEnum(GENDER_TYPE, {
    message: 'gender 1 혹은 2 이어야 합니다.',
  })
  gender: GENDER_TYPE;

  @ApiProperty({
    example: 'nickname',
  })
  @IsString()
  nickName: string;

  @ApiProperty({
    example: 'introduce',
  })
  @IsString()
  introduce: string;

  // @ApiProperty({
  //   example: 'uniqueCode',
  // })
  // @IsString()
  // uniqueCode: string;
}
