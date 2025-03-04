import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUniqueCode } from '../utils/generateUniqueCode';
import { ResponseAuthDto } from './dto/response-auth.dto';
import * as bcyrpt from 'bcrypt';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<ResponseAuthDto> {
    this.logger.debug('create start');
    try {
      const { email, password } = createAuthDto;

      // check if email already exists
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        return {
          message: '이미 가입된 이메일 입니다.',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      await this.validateCreateAuthDto(createAuthDto);

      // create uniqueCode
      const uniqueCode = await this.createUniqueCode();

      // create user
      const user = this.userRepository.create({
        ...createAuthDto,
        uniqueCode,
      });

      // password hashing
      const salt = await bcyrpt.genSalt();
      user.password = await bcyrpt.hash(password, salt);

      // save user
      await this.userRepository.save(user);

      this.logger.debug('create end');

      return {
        message: 'success',
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      this.logger.error('create user failed', e);
    }
  }

  async validateCreateAuthDto(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
    }
    if (
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}$/,
      )
    ) {
      throw new BadRequestException(
        '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
      );
    }
  }

  // create uniqueCode
  async createUniqueCode() {
    this.logger.debug('createUniqueCode start');
    try {
      let uniqueCode: string;
      let isUnique = false;

      while (!isUnique) {
        uniqueCode = generateUniqueCode();
        const existingUser = await this.userRepository.findOne({
          where: { uniqueCode },
        });
        if (!existingUser) {
          isUnique = true;
        }
      }
      this.logger.debug('createUniqueCode end');
      return uniqueCode;
    } catch (e) {
      this.logger.error('create uniqueCode failed', e);
    }
  }

  // findByEmail
  findByEmail = async (email: string) => {
    this.logger.debug('findByEmail start');
    const existingUser = await this.userRepository.existsBy({
      email,
    });

    this.logger.debug('findByEmail end');
    return existingUser;
  };

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 이메일입니다.');
    }

    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  // generateUniqueCode(): string {
  //   const letters = Math.random().toString(36).substring(2, 4).toUpperCase();
  //   const numbers = Math.floor(Math.random() * 10000)
  //     .toString()
  //     .padStart(4, '0'); // 4 digits
  //   return `${letters}${numbers}`;
  // }
}
