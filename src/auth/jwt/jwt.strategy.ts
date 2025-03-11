import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { Payload } from './jwt.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtReadAuthDto } from './jwt-read.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  // Promise<JwtReadAuthDto>
  async validate(payload: Payload): Promise<any> {
    const { email } = payload;
    console.log('payload', payload);
    console.log('email', email);

    const user = await this.authRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('payload', payload);

    return payload;
    // return payload;
    // return {
    //   accessToken: user.accessToken,
    // };
  }
}
