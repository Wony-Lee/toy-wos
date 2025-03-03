import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUniqueCode } from '../utils/generateUniqueCode';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    this.logger.debug('create start');
    let uniqueCode: string;
    let isUnique = false;

    while (!isUnique) {
      const uniqueCode = generateUniqueCode();
      const existingUser = await this.userRepository.findOne({
        where: { uniqueCode },
      });

      if (!existingUser) {
        isUnique = true;
      }
    }

    return uniqueCode;
  }

  async createUniqueCodeSample() {
    this.logger.debug('create start');
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

    return uniqueCode;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  generateUniqueCode(): string {
    const letters = Math.random().toString(36).substring(2, 4).toUpperCase();
    const numbers = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0'); // 4 digits
    return `${letters}${numbers}`;
  }

  private async isDuplicateCode(uniqueCode: string): Promise<boolean> {
    const duplicateCount = await this.userRepository.count({
      where: { uniqueCode },
    });

    return duplicateCount > 0;
  }

  async ensureUniqueCodeForUser(userId: string): Promise<void> {
    try {
      this.logger.debug('ensureUniqueCodeForUser start');
      let uniqueCode: string;
      let isDuplicate: boolean;
      do {
        uniqueCode = this.generateUniqueCode();
        isDuplicate = !!(await this.userRepository.findOne({
          where: { uniqueCode },
        }));
      } while (isDuplicate);

      await this.userRepository.update(userId, { uniqueCode });
      this.logger.debug('ensureUniqueCodeForUser end');
    } catch (e) {
      this.logger.error('ensureUniqueCodeForUser error', e);
    }
  }
}
