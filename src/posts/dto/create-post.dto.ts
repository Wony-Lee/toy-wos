import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: '안녕하세요.',
    description: '타이틀',
    required: true,
  })
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  @IsString({
    message: '타이틀은 문자열이어야 합니다.',
  })
  title: string;

  @ApiProperty({
    example: '반갑습니다.',
    description: '내용',
    required: true,
  })
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  @IsString({
    message: '내용은 문자열이어야 합니다.',
  })
  content: string;
}

export class CreatePostReadDto {
  @ApiProperty({
    example: '127.0.0.1',
    description: 'user ip',
  })
  ip: string;

  @ApiProperty({
    example: 1,
    description: '게시글 id',
  })
  postId: number;
}
