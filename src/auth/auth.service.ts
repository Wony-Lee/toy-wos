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
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<ResponseAuthDto> {
    this.logger.debug('create start');
    try {
      const { email, password } = createAuthDto;

      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        return {
          message: '이미 가입된 이메일 입니다.',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      await this.validateCreateAuthDto(createAuthDto);

      const uniqueCode = await this.createUniqueCode();

      const user = this.userRepository.create({
        ...createAuthDto,
        uniqueCode,
      });

      const salt = await bcyrpt.genSalt();
      user.password = await bcyrpt.hash(password, salt);

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

  async findByEmail(email: string) {
    this.logger.debug('findByEmail start');
    const existingUser = await this.userRepository.existsBy({
      email,
    });

    this.logger.debug('findByEmail end');
    return existingUser;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 이메일입니다.');
    }
    return user;
  }

  async signIn(loginAuthDto: LoginAuthDto): Promise<ResponseAuthDto> {
    const { email, password } = loginAuthDto;
    console.log('loginAuthDto', loginAuthDto);
    const user = await this.userRepository.findOne({
      where: { email },
    });

    console.log('user', user);
    if (!user) {
      throw new BadRequestException('존재하지 않는 이메일입니다.');
    }

    const isPasswordValid = await bcyrpt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    try {
      const payload = {
        email: user.email,
        uniqueCode: user.uniqueCode,
      };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '1h',
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      // await this.userRepository.update(user.id, {
      //   refreshToken: refreshToken,
      // });

      return {
        message: '로그인 성공',
        statusCode: HttpStatus.OK,
        accessToken: accessToken,
      };
    } catch (e) {
      console.log('e', e);
    }
  }

  async signOut(loginAuthDto: LoginAuthDto): Promise<ResponseAuthDto> {
    const { email } = loginAuthDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 이메일입니다.');
    }

    try {
      return {
        message: '로그아웃 성공',
        statusCode: HttpStatus.OK,
      };
    } catch (e) {
      console.log('e', e);
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
